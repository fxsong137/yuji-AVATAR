
import Hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
const highlightCode = () => {
    const preEl = document.querySelectorAll('pre')
  
    preEl.forEach((el) => {
        Hljs.highlightBlock(el)
    })
  }
  
  export default {
      mounted () {
          highlightCode() 
      },
  
      updated () {
          highlightCode()
      }
  }
 

