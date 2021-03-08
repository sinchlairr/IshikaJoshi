        var scene2 = new THREE.Scene();
        var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        const canvas2 = document.querySelector('#proj');
        var renderer2 = new THREE.WebGLRenderer({canvas2, alpha: true});
        // renderer2.setClearColor("#000000", 0);
      
        renderer2.setSize(window.innerWidth, window.innerHeight);
        scene2.fog = new THREE.FogExp2('black', 0.001);
        renderer2.setClearColor(scene2.fog.color);
        document.body.appendChild(renderer2.domElement);
        // var light = new THREE.PointLight('red',1,500);
        // light.position.set(0,0,26);
        // scene2.add(light);
        // let controls = new THREE.OrbitControls(camera2, renderer2.domElement );
        // controls.addEventListener('change',renderer2);
        // controls.minDistance=500;
        // controls.maxDistance=1500;
        const texture2 = new THREE.TextureLoader().load( 'imgs/moon.png' );
        // texture2.wrapS = THREE.RepeatWrapping;
        // texture2.wrapT = THREE.RepeatWrapping;
        // texture2.repeat.set( 1, 1);

        var geometry2 = new THREE.SphereGeometry(1, 0,0);
        var material2 = new THREE.MeshBasicMaterial(
            // { map: texture2 }
            {color: "transparent"}
        );
        var cube_2 = new THREE.Mesh(geometry2, material2);
        cube_2.position.y=-7;
        cube_2.position.z=10;
        camera2.position.y=-4;
        // camera2.position.z=-4;
        // cube_2.scale.set(0.05,0.05)
        // console.log(cube_2.scale);

        
        scene2.add(cube_2); 
        const domEvents= new THREEx.DomEvents(camera2,renderer2.domElement);
        domEvents.addEventListener(cube_2,'click', event=>{
            // if (!sphereclicked){
            // material.wireframe=false;
            // sphereclicked= true;}
            // else{
            //     material.wireframe=true;
            //     sphereclicked=false;
            // }
            location.href = "solarsys.html";
        });

        var cube_22 = new THREE.Mesh(geometry2, material2);
        cube_22.position.x=4;
        cube_22.position.y=-7;
        cube_22.position.z=10;
        // camera2.position.y=-4;
        scene2.add(cube_22);        
        
        

        var cube_23 = new THREE.Mesh(geometry2, material2);
        cube_23.position.x=-4;
        cube_23.position.y=-7;
        cube_23.position.z=10;
        scene2.add(cube_23);

        camera2.position.z = 22;
        // camera2.position.set( 0, 20, 10 );



        

        var render_2 = function() {
        requestAnimationFrame(render_2);

        cube_2.rotation.x += 0.01;
        cube_2.rotation.y += 0.01;       
        cube_22.rotation.x += 0.01;
        cube_22.rotation.y += 0.01;        
        cube_23.rotation.x += 0.01;
        cube_23.rotation.y += 0.01;

        renderer2.render(scene2, camera2);
        };

        render_2();