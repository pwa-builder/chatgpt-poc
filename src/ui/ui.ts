import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';

// @ts-ignore
@customElement('app-root')
class AppRoot extends LitElement {

  // @ts-ignore
  @property({type: String})
  stage: 'start' | 'warmup' | 'url' | 'manifestGen' | 'packageGen' | 'success' | 'error' = 'start';

  // @ts-ignore
  @property({type: Boolean})
  isLoading = false;

  // @ts-ignore
  @state()
  url = '';
  // https://apps.microsoft.com/store/apps

  // @ts-ignore
  @state()
  manifest = '';
  // JSON.parse('{"manifest":{"name":"Microsoft Apps","short_name":"Microsoft Apps","description":"Make Microsoft Windows your own with apps and themes that help you personalise Windows and be more productive.","icons":[{"src":"https://microsoft-store.azurewebsites.net/store/images/logo-512x512.png","type":"image/png","sizes":"512x512"}],"start_url":".","display":"standalone","theme_color":"#000000","background_color":"#ffffff"}}');

  initAPI = async function(): Promise<void> {
    this.stage = 'warmup';
    this.isLoading = true;
    this.requestUpdate();

    const result = await fetch('/initAPI');
    this.stage = result.status == 200? 'url' : 'error';
    this.isLoading = false;

    this.requestUpdate();
  }

  generateManifest = async function(): Promise<void> {
    this.stage = 'manifestGen';
    this.isLoading = true;
    this.requestUpdate();

    const result = await fetch(`/generateManifest?url=${this.url}`);
    if (result.status == 200){
      this.manifest = await result.json();
      console.log(this.manifest);
      this.generateWinPackage();
    }
    else
      this.stage = 'error';
    this.isLoading = false;

    this.requestUpdate();
  }

  generateWinPackage = async function(): Promise<void> {
    this.stage = 'packageGen';
    this.isLoading = true;
    this.requestUpdate();

    const result = await fetch(`/generateWinPackage?url=${this.url}`, {
      headers: {
          'Content-Type': 'application/json',
      },  body: JSON.stringify({manifest: this.manifest?.manifest}), method: 'POST'});
    this.stage = result.status == 200? 'success' : 'error';
    this.isLoading = false;

    if (this.stage == 'success') {
      let file = window.URL.createObjectURL(await result.blob());
      window.location.assign(file);
    }

    this.requestUpdate();
  }

  goThrough = async function(): Promise<void> {
    switch (this.stage) {
      case 'start':
      case 'error':
        await this.initAPI();
        break;
      case 'url':
        await this.generateManifest();
        break;
      default:
        break;
    }

    this.requestUpdate();
  }

  render() {
    return html`
      <sl-card class="card-header card-footer">
        <div slot="header">
          <span>
            PWABuilder ChatGPT PoC<br>
            <small>Web Manifest generation via LLM</small>
          </span>
          
          <!-- <sl-icon-button name="gear" label="Settings"></sl-icon-button> -->
        </div>

        ${choose(this.stage, [
          ['start', () => html`This prototype explores possibilities and horizons of using LLM like ChatGPT in PWA development.`],
          ['warmup', () => html`Warming up ChatGPT...`],
          ['url', () => html`
            <sl-input 
              id="url"
              .value=${this.url}
              @sl-input=${(e: any) => {this.url = e.target.value; this.requestUpdate();}}
              required
              label="Input webapp url" 
              placeholder="https://example.com"
              help-text="Without or broken manifest file"></sl-input>
            `],
          ['manifestGen', () => html`Generating Web Manifest...`],
          ['packageGen', () => html`Generating Microsoft package...`],
          ['success', () => html`Success! Try to install the app from the generated package.`],
        ],
        () => html`Error :(`)}

        <!-- ${choose(this.stage, [
          ['url', () => html`Input URL of the webapp with no manifest`],
        ])} -->        

        <div slot="footer">
          <sl-button ?disabled=${this.stage == 'success'} variant="primary" ?loading=${this.isLoading} @click=${this.goThrough}>Proceed</sl-button>
        </div>
      </sl-card>
    `;
  }
  static styles = css`
  :host {
    font-size: 18px;
  }

  .card-header{
    max-width: 450px;
  }

  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-footer [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
    `;
}