// only execute the script after the window has loaded
window.addEventListener('load', () => {
    // variable to hold search history
    let searchHistory = [];
// initialize the local storage
if(localStorage.getItem('searchHistory') == null){
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))