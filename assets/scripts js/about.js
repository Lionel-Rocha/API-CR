const menu = document.querySelector("#menu-hamburguer");

menu.addEventListener('click', function(event){
  const modalmenu = document.querySelector(".m-hamb-open");
  const validacaoClick = document.querySelector("main");

  modalmenu.classList.toggle("active");

  validacaoClick.addEventListener('click', function(event){
    if(event.target != modalmenu){
      modalmenu.classList.remove("active");
    }
  })

  
} )