
const USER_PREFERENCIAS = {
  theme: "",
  icon: "",
  LS_THEME: "theme",
  theme_default: {
    theme: "dark",
    icon: "<i class='bx bx-moon white'></i>"
  }
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

const cursor            = document.querySelector('.cursor'),
      disco             = document.querySelector('.disco'),
      main_container    = document.querySelector('.main-container'),
      theme             = document.querySelector('.theme'),
      btn_play          = document.querySelector('#btn-play'),
      anterior          = document.querySelector('[data-before]'),
      next              = document.querySelector('[data-next]'),
      container_proyecto = document.querySelectorAll('#proyectos'),
      container_sobremi = document.querySelectorAll('#sobremi');

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

window.addEventListener("DOMContentLoaded", function(){

  const user_pref_theme = JSON.parse(localStorage.getItem(USER_PREFERENCIAS.LS_THEME)) || USER_PREFERENCIAS.theme_default;

  if(user_pref_theme){
    document.body.className = "";
    document.body.classList.add(user_pref_theme.theme);
    theme.innerHTML = user_pref_theme.icon;
  }

  let timeout;
  let posicion;
  
  window.addEventListener("mousemove", function(evt) {

    clearTimeout(timeout);

      setTimeout(function() {

        cursor.style = "display: block; left: " + evt.pageX + "px; top: " + evt.pageY + "px;";

        const pos = (evt.clientX - document.body.clientWidth / 50) / 100;
        posicion = (pos / 8)

        disco.classList.remove("animate")

        disco.style = "transform: rotate(" + posicion + "turn); transition: all 0.2s;";

      }, 10);

      timeout = setTimeout(function() {
        
        disco.classList.add("animate") 

        // const animation = [{
        //   transform: `rotate(${posicion}turn);`,
        //   transform: `rotate(2turn);`
        // }]
        // const animationtiming = {
        //   duration: 2000,
        //   iteration: "infinite",
        //   timingFunction: "linear"
        // }
        // disco.animate(animation, animationtiming)



      }, 200)
  }, true);

  //---------------------------------------------

  main_container.addEventListener("mousewheel", function(evt){

    main_container.scrollLeft += (evt.deltaY);

    //-----------------------

    const pos = (evt.deltaY - document.body.clientWidth / 50) / 100;

    disco.style = "transform: rotate(" + (pos / 8) + "turn); transition: all 0.2s;";

    //-----------------------

    document.querySelectorAll(".reveal")
            .forEach(function(reveal) {

              const elementLeft = reveal.getBoundingClientRect().left,
                    elementVisible = 150,
                    windowHeight = window.innerHeight;

              if(elementLeft < windowHeight - elementVisible){
                reveal.classList.add("active")
              }

            })

  })

  //---------------------------------------------

  theme.addEventListener("click", function(evt){
    const body = document.body;

    if(body.classList.contains("dark")) {
      body.classList.remove( "dark" );
      body.classList.add("light");
      theme.innerHTML = "<i class='bx bx-sun black'></i>"

      USER_PREFERENCIAS.theme = "light";
      USER_PREFERENCIAS.icon = "<i class='bx bx-sun black'></i>";

      localStorage.setItem(USER_PREFERENCIAS.LS_THEME, JSON.stringify(USER_PREFERENCIAS));

    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      theme.innerHTML = "<i class='bx bx-moon white'></i>"

      USER_PREFERENCIAS.theme = "dark";
      USER_PREFERENCIAS.icon = "<i class='bx bx-moon white'></i>";

      localStorage.setItem(USER_PREFERENCIAS.LS_THEME, JSON.stringify(USER_PREFERENCIAS));

    }  

  })

  //---------------------------------------------

  btn_play.addEventListener("click", function(evt) {
    const play = btn_play.querySelector(".play"),
          audio = btn_play.querySelector("#audio");

    if(!audio) {return;}

    if(play.classList.contains("is-playing")){
      play.classList.remove("is-playing")
      play.classList.add("is-paused");
      play.innerHTML = "<i class='bx bx-pause-circle'></i>"

      audio.pause();

    }else{
      play.classList.remove("is-paused");
      play.classList.add("is-playing")
      play.innerHTML = "<i class='bx bx-play-circle'></i>"

      audio.play();

    }

  })

  //---------------------------------------------
  
  container_proyecto.forEach(function(proyecto){
    proyecto.addEventListener("scroll", function(evt){
      console.log("ENTRA MOUSEWHEEL PROYECTO")
      proyecto.scrollTop += (evt.deltaY);
    })
  })

})
