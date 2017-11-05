const searchDocument = document.currentScript.ownerDocument

class SearchBar extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'}),
          template = searchDocument.getElementById("searchbar-template"),
          instance = template.content.cloneNode(true)

    instance.querySelector(".searchbar__form").addEventListener("submit", (e) => {
      e.preventDefault()

      this.submitHandler(e)
    })

    shadowRoot.appendChild(instance)
  }

  submitHandler(e) {
    const gitId = e.target.querySelector(".searchbar__input").value
    let cardInstance = searchDocument.createElement("git-card")

    cardInstance.setAttribute("data-git-id", gitId)
    document.getElementById("card-container").prepend(cardInstance) 

    e.target.querySelector(".searchbar__input").value = ""
  }
}

customElements.define('search-bar', SearchBar)