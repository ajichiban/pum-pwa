const btnNext = document.querySelector('.btn-next'),
      containerDoors = document.querySelector('.container-doors'),
      containerSecretMSgs = document.querySelector('.container-secret-msgs'),
      bannerLayer2 = document.querySelector('.banner-layer-2')

//Registro del serviceWorker
if('serviceWorker' in navigator ){
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('registro de SW exitoso', reg))
        .catch(err => console.log('Error al registrar SW ', err))
}

/*===========================================================
                         LAYER # 1 OPENNING                                  
=============================================================*/
;
(()=>{
    let heart = document.querySelector('.heart-openning')
    let layerL= document.querySelector('.layer-left')
    let layerR= document.querySelector('.layer-right')
    heart.addEventListener('click', ()=>{
        
        layerR.style.transform = 'translateX(100vw)'
        layerL.style.transform += 'translateX(-100vw)'
        heart.style.transform = 'scale(1.4)'
        heart.style.opacity = 0.5
        setTimeout(()=>{
            heart.style.display = 'none'
            containerDoors.style.display = 'grid';
            bannerLayer2.style.animationPlayState = 'running'
        },2300)
        
    })
})()
;
/*===========================================================
                LAYER # 2 LOVE'S DOORS                           
=============================================================*/
(()=>{
    let bannerArrow = document.querySelector('.banner-layer-2')
    let arrowForwards = document.querySelector('.banner-layer-2 i')

    let doors = Array.from(document.querySelectorAll('.door'))

    const ani =[
        {origin:'right', rotate:'rotateY(90deg)'},
        {origin:'center bottom', rotate:'rotateX(-90deg)'},
        {origin:'left', rotate:'rotateY(-90deg)'},
        {origin:'center top', rotate:'rotateX(90deg)'}
    ]
    let index 
    let openDoors = 0

    // Listener of the doors
    doors.forEach((el, i)=>{
        el.addEventListener('click', ()=>{

            // next level
            openDoors++
            if(openDoors === 6){
                btnNext.style.opacity = 1
                btnNext.addEventListener('click', ()=>{
                    btnNext.style.opacity = 0
                    btnNext.removeEventListener('click',()=>{})
                    
                    // next level
                    containerDoors.style.transform = 'translateX(100vw)'
                    containerSecretMSgs.style.opacity = 1

                })
            }

            // opening and closing doors
            if(el.classList.contains('open')){
                el.classList.remove('open')
                el.style.transform = removeAnimation(el.style.transform)
            }else{
                el.classList.add('open')
                index = Math.floor(Math.random() * (3 - 0)) + 0
                el.style.transformOrigin = ani[index+1].origin
                el.style.transform = ani[index+1].rotate
            }
            
        })
    })

    // Listener other
    bannerArrow.addEventListener('animationend',()=>{
        arrowForwards.style.opacity = 1

        // removing animation and putting it the ends values it
        bannerArrow.style.animation = 'none'
        bannerArrow.style.width = '100vw'
        bannerArrow.style.height = '100vh'
        bannerArrow.style.top =  '0vh'
        bannerArrow.style.transform = 'translateX(0)'

        arrowForwards.addEventListener('click', () => {
            console.log('adiosss')
            
            bannerArrow.style.transform = 'translateX(100%)'
            
        })
    })

    function removeAnimation(prop){
        let rotate = ''
        switch(prop){
            case 'rotateY(90deg)':
                return rotate = 'rotateY(0deg)'
                break
            case 'rotateX(-90deg)':
                return rotate = 'rotateX(0deg)'
                break
            case 'rotateY(-90deg)':
                return rotate = 'rotateY(0deg)'
                break
            default:
                return rotate = 'rotateX(0deg)'
                break
        }
    }
})()

/*===========================================================
                 LAYER # 3  SECRET MESSAGES                                
=============================================================*/
;
(()=>{
    let balls = Array.from(document.querySelectorAll('.ball'))
    let msgs = Array.from(document.querySelectorAll('.msg'))

    balls.forEach((el,i)=>{
        el.addEventListener('click', ()=>{
            if(!el.classList.contains('moved')){
                el.classList.add('moved')
                el.style.animation = 'moveBall 5s ease forwards'
                msgs[i].style.opacity = 1

                el.addEventListener('animationend', ()=>{
                    el.style.transform = 'translateX(65vw) translateY(60px) rotate(3turn)'
                    el.style.animation = 'none'
                })
            }else{
                el.classList.remove('moved')
                el.style.transform = 'translateX(0) translateY(0) rotate(-3turn)'
                msgs[i].style.opacity = 0
            }
            
        })
    })
})()
