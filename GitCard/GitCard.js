const currentDocument = document.currentScript.ownerDocument;

class GitCard extends HTMLElement {
  constructor() {
    super()

    this.addEventListener('click', (e) => {
      this.clickHandler()
    })
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'}),
          template = currentDocument.getElementById("git-card-template"),
          instance = template.content.cloneNode(true)

    shadowRoot.appendChild(instance)

    const gitId = this.getAttribute('git-id'),
          url = "https://api.github.com/users/" + gitId


    fetch(url)
      .then((response) => {response.text()})
      .then((responseText) => {
        this.render(JSON.parse(responseText))
      })
      .catch((error) => {
        console.error(error)
      })

  }

  render(gitData) {
    this.shadowRoot.querySelector('.git__full-name').innerHTML = gitData.name;
    this.shadowRoot.querySelector('.git__user-name').innerHTML = gitData.username;
    this.shadowRoot.querySelector('.git__website').href = gitData.url;
    this.shadowRoot.querySelector('.git__website').innerHTML = gitData.url;
    this.shadowRoot.querySelector('.git__avatar').src = gitData.avatar_url;
  }

  clickHandler() {
    console.log("WOAH BOY YOU JUST CLICKED A GITCARD!")

    let el = this.shadowRoot.querySelector('.git__hidden-content'),
        btn = this.shadowRoot.querySelector('.git__details-btn')

        btn.innerHTML = el.style.display 'none' ? 'Less Deets' : 'More Details'
        el.style.display = el.style.display == 'none' ? 'block' : 'none'    
  }
}

customElements.define('git-card', GitCard)