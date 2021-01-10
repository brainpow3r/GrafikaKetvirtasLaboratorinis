$(function () {
    var scene; 
    var camera; 
    var renderer; 
    var guiControl;    
	var viewport; 
    var mesh;
 
    window.addEventListener( 'load', function() {
        guiControl = new function() {
            this.X = 1.0;
            this.Y = 1.0;
            this.Z = 1.0;
            this.MinV = 0.45;
            this.MaxV = 0.75;
            this.Blur = 1.0;
        }
        var gui = new dat.GUI();
        gui.add(guiControl, 'X', -10.0, 10.0, 1.0).step(0.5);    
        gui.add(guiControl, 'Y', -10.0, 10.0, 1.0).step(0.5);    
        gui.add(guiControl, 'Z', 0.0, 10.0, 1.0).step(0.5);
        gui.add(guiControl, 'MinV', 0.0, 1.0, 1.0);
        gui.add(guiControl, 'MaxV', 0.0, 1.0, 1.0);
        gui.add(guiControl, 'Blur', 0.0, 10.0, 1.0).step(0.5); 

        viewport = document.getElementById( "viewport" );
        
        scene = new THREE.Scene();
    
        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set(0, 0, 120);
        scene.add( camera );
        
        material = new THREE.ShaderMaterial( {
            uniforms: { 
                dx: {type: 'f', value:  1.0}, 
                dy: {type: 'f', value:  1.0}, 
                dz: {type: 'f', value:  3.0},
                minV: { type: 'f' },
                maxV: { type: 'f' },
                uEdge: {type: 'f', value:  4.0} 
            },
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent  
        } );
        
        teapot = new THREE.TeapotGeometry(15, 50, true, true, true, true, true);
        scene.add( new THREE.Mesh(teapot, material) );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        viewport.appendChild( renderer.domElement );
        controls = new THREE.TrackballControls( camera, renderer.domElement );     
        render();
 
    } );

    function updateObjectByControls() {
        console.log('gui: ', guiControl)
        console.log('masd: ', material.uniforms)
        material.uniforms.uEdge.value = guiControl.Blur; 
        material.uniforms.dx.value = guiControl.X; 
        material.uniforms.dy.value = guiControl.Y; 
        material.uniforms.dz.value = guiControl.Z;
        material.uniforms.minV.value = guiControl.MinV;
        material.uniforms.maxV.value = -guiControl.MaxV;
    }
 
    function render() {
        updateObjectByControls();
        renderer.render( scene, camera );
        requestAnimationFrame( render );
        controls.update(); 
    }   
})