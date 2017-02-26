var startTime	= Date.now();
var group;
var container, controls, stats;
var particlesData = [];
var camera, scene, renderer, composer;
var positions, colors;
var particles;
var pointCloud;
var particlePositions, particleTo, particleSnapshot , particleIndex;
var linesMesh;

var perlinScale3D = 10;
var perlinScale2D = 2600;
var factor = 4;
var epsilon = 0.1850;
var tick = 4;
var snapshotTaken = false;

var maxParticleCount = 2000;
var particleCount = 1860;
var r = 700;
var rHalf = r / 4;
var u_time = 0;

var nx = 10;
var ny = 20;
var nz = 40;

var fx = r / nx;
var fy = r / ny;
var fz = r / nz;

var simplex = new SimplexNoise();

var params = {
				projection: 'normal',
				background: 	false,
				exposure: 		0.0,
				bloomStrength: 	0.62,
				bloomThreshold: 0.16,
				bloomRadius: 	1.0,
				clipping_start: -580,
				clipping_end :  -5500,
};

    var circleTexture = new THREE.Texture(generateCircleTexture());
    circleTexture.needsUpdate = true;


var effectController = {
	factor: factor,
	epsilon: epsilon,
	bloom : true,
	showDots: true,
	showLines: true, 
	minDistance: 690,
	timeAcceleration : 1,
	pulseStrength : 0.1,
	particleCount: particleCount,
	maxConnections: 72,
	limitConnections: true,
	rotSpeed: 0.0,
	speed: 0.26,
	depthTest : true
};
 

var uniforms = {
	"time" : { type: "f", value: 0 }, // single float
	"pulseStrength" : { type: "f", value: effectController.pulseStrength },
	"clipping_threshold_end" : { type: "f", value: Number(params.clipping_end) },
	"clipping_threshold_start" : { type: "f", value: Number(params.clipping_start) },
	texture:   { type: "t", value: circleTexture}, //loader.load("textures/transaction.png") },
} 

// maybe replace that by window... or something
var userOpts	= {
	range		: 200,
	duration	: 9000,
	delay		: 300,
	easing		: 'Linear.EaseNone'
};

init();
  


	var current	= particlePositions;


function initGUI() {
	var gui = new dat.GUI();

	gui.add( params, 'clipping_end', -20000,20000  ).onChange( function(value) {
		  uniforms.clipping_threshold_end.value =Number(value);
	});

	gui.add( params, 'clipping_start', -20000,20000  ).onChange( function(value) {
		uniforms.clipping_threshold_start.value = Number(value);
	});

	gui.add(effectController, "bloom");

	gui.add( params, 'exposure', 0.1, 2 );

	gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function(value) {
		bloomPass.threshold = Number(value);
	});

	gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function(value) {
		bloomPass.strength = Number(value);
	});

	gui.add( params, 'bloomRadius', 0.0, 1.0 ).onChange( function(value) {
		bloomPass.radius = Number(value);
	});
	gui.add( effectController, "showDots" ).onChange( function( value ) {
	  	pointCloud.visible = value;
	});
	
	gui.add(effectController, "showLines").onChange( function( value ) {
	  	linesMesh.visible = value;
	});
		gui.add(effectController, "minDistance", 10, 300 * perlinScale3D).onChange(function (value) {
    	pushCloud();
	});

		gui.add(effectController, "limitConnections").onChange(function (value) {
    	pushCloud();
	});

		gui.add(effectController, "maxConnections", 0, 100, 1 ).onChange(function (value) {
    	pushCloud();
	});

	gui.add(effectController, "factor", 0, 5, 1).onChange( function( value ) {
	  	factor = value;
    	initPositions();
    	pushCloud();
	});

	gui.add(effectController, "epsilon", 0.00001, 0.5, 1 ).onChange( function( value ) {
	  	epsilon = value;
    	initPositions();
    	pushCloud();
	});

	gui.add(effectController, "particleCount", 0, maxParticleCount).onChange( function( value ) {
		particleCount = parseInt( value );
		particles.setDrawRange( 0, particleCount );
    	pushCloud();
	});

	gui.add(effectController, "rotSpeed", 0, 20, 1 ).onChange(function (value) {
	  rotSpeed = value;
	  controls.autoRotateSpeed =effectController.rotSpeed * rotSpeedMul;
	});

	gui.add(effectController, "speed", 0, 5, 0.01 ).onChange(function (value) {
	  speed = value;
	});

	gui.add(effectController, "timeAcceleration", 0, 10, 0.01 );
	gui.add(effectController, "pulseStrength", 0, 0.5, 0.01 ).onChange( function(value) {
		uniforms.pulseStrength.value = Number(value);
	});

	gui.add(effectController, "depthTest").onChange( function( value ) {
	  	linesMesh.material.depthTest = value;
	  	//pointCloud.material.depthTest = value;
	});
}


function initPositions() {
  var index = 0;
  var perlinPoint;
  particleIndex = [];
  	for (var i = 0; i < nx; i++) {
	  for (var j = 0; j < ny; j++) {
	    for (var k = 0; k < nz; k++) {
    		var x = ( (i * fx * 2) - r + fx / 2) * perlinScale3D;
    		var y = (j * fy - rHalf + fy / 2) * perlinScale3D * 3/5;
    		var z = (k * fz / 10 - r/5) * perlinScale3D;
    	
    		perlinNoise = simplex.noise3D(x,y,z);

    		particlePositions[index] = x + ( fx * 2 * ( (simplex.noise3D(x + epsilon, y, z) - perlinNoise) / epsilon ) );
    		particleTo[index++] = x + ( fx * 2 * ( (simplex.noise3D(x + epsilon * factor, y, z) - perlinNoise) / epsilon * factor ) );    		
    		
    		particlePositions[index] =  y + ( fy * ( (simplex.noise3D(x, y + epsilon, z) - perlinNoise) / epsilon ) ) + (simplex.noise2D(z * perlinScale3D, y * perlinScale3D) * perlinScale2D * 3/5);
    		particleTo[index++] =  y + ( fy * ( (simplex.noise3D(x, y + epsilon * factor, z) - perlinNoise) / epsilon * factor ) ) + (simplex.noise2D(z * perlinScale3D, y * perlinScale3D) * perlinScale2D/2 * 3/5);
    		
    		particlePositions[index] =  z + ( fz * ( (simplex.noise3D(x, y, z + epsilon * factor) - perlinNoise) / epsilon * factor) ) + (simplex.noise2D(x * perlinScale3D, y * perlinScale3D) * perlinScale2D) + (-y * perlinScale3D / 10);
    		particleTo[index++] =  z + ( fz * ( (simplex.noise3D(x, y, z + epsilon * factor) - perlinNoise) / epsilon * factor) ) + (simplex.noise2D(x * perlinScale3D, y * perlinScale3D) * perlinScale2D) + (-y * perlinScale3D / 10);
    		particlesData.push({
    			velocity: new THREE.Vector3( 1, 0,  -1 + Math.random() * 2 ),
    			numConnections: 0
    		});
	    }
	  }
	}
}

function init() {
	// test if webgl is supported
	if ( ! Detector.webgl )	Detector.addGetWebGLMessage();

	initGUI();

	stats = new Stats();
	stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	container = document.getElementById( 'container' );
 //424.5773992954919, y: -4232.330461118376, z: 5541.233115473748}
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 10, 200000 );
	camera.position.x =		-2978;// 3806;
	camera.position.y = 	-7641;	//-154;
	camera.position.z =		857;// 4752;
//Vector3 {x: -371.8451144237215, y: -5473.898062401281, z: 6139.221810883664}
	controls = new THREE.OrbitControls( camera, container );

	// These variables set the camera behaviour and sensitivity.
	controls.rotateSpeed = 1.02;
	controls.zoomSpeed = 1.25;
	controls.panSpeed = 1;
	controls.enableZoom = true;
	controls.enablePan = true;
	controls.enableDamping = true;
	controls.dynamicFactor = 1;
	controls.minDistance = 0;
	controls.maxDistance = 1000000;
	//controls.minPolarAngle = 35 * (Math.PI/180); // radians
	//controls.maxPolarAngle = 80 * (Math.PI/180); // radians
	controls.autoRotate = true;
	controls.autoRotateSpeed =effectController.rotSpeed * rotSpeedMul;
	controls.target = new THREE.Vector3(-3273,4731,-313);


  controls.update();
	scene = new THREE.Scene();
	group = new THREE.Group();
	scene.add( group );


	//var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );
	//helper.material.color.setHex( 0x080808 );
	//helper.material.blending = THREE.AdditiveBlending;
	//helper.material.transparent = true;
	//group.add( helper );

	var segments = maxParticleCount * maxParticleCount;
	//uniforms.total_.value = segments;
	colors = new Float32Array( segments );
	positions = new Float32Array( segments * 3 );

	var pMaterial = new THREE.PointsMaterial({
		color: 0x22FFFF,
		size: 8,
		blending: THREE.NormalBlending,
		transparent: true,
		sizeAttenuation: true
	});
	particles = new THREE.BufferGeometry();
	particleIndexs = new Float32Array(segments);
	particlePositions = new Float32Array(maxParticleCount * 3);
	particleTo = new Float32Array(maxParticleCount * 3);
	particleSnapshot = new Float32Array(maxParticleCount * 3);
	//particleNormalize = new Float32Array(segments);
	var i = particleIndexs.length;
	while(i--){
		particleIndexs[i] = i;
		//particleNormalize[i] = i/segments;
	}
	//console.log(particleIndexs)
  	initPositions();
	// initial setup of the tweens

	//particles.setDrawRange(0, particleCount );
	//particles.addAttribute('position', new THREE.BufferAttribute( particlePositions, 3 ).setDynamic( true ) );


	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'index_', new THREE.BufferAttribute( particleIndexs, 1 ) );
	//geometry.addAttribute( 'normalized_', new THREE.BufferAttribute( particleNormalize, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
	geometry.addAttribute( 'alpha', new THREE.BufferAttribute( colors, 1 ).setDynamic( true ) );
	//geometry.computeBoundingSphere();
	geometry.setDrawRange( 0, 0 );


/*
  var shaderMaterial = new THREE.ShaderMaterial({
		vertexShader: `
      	varying vec3 pos;
		attribute float alpha;
		varying float alpha_;
		uniform float time;
		varying vec4 pos_gl;

      	#ifdef GL_ES
  		// precision highp float;
  		#endif
  		
  		void main()
  		{
  			alpha_ = alpha*0.000005+time*0.8;

  			vec3 pos_ = vec3(
  				1000.0 * sin(time*gl_VertexID*0.001),
  				1000.0 * sin(time*gl_VertexID*0.001),
  				1000.0 * sin(gl_VertexID*time*0.002) 
  			);
          	pos = pos_;
          	pos_gl = projectionMatrix * modelViewMatrix * vec4(pos_, 1.0);
          	gl_Position = pos_gl;
  		}
		`,
		fragmentShader: `
      	// same name and type as VS
      	varying vec3 pos;
		varying float alpha_;
		uniform float clipping_threshold_end;
		uniform float clipping_threshold_start;
		varying vec4 pos_gl;
      	#ifdef GL_ES
  		// precision highp float;
  		#endif
  		
  		void main(){
  		//if (pos_gl.x > clipping_threshold_start || pos_gl.x < clipping_threshold_end){
  		
  		//	discard;
  		//}else{
  			vec3 light = pos;
        	light = normalize(light) * 0.4;
        	gl_FragColor = vec4(0.35 + light.x+ light.y, // R
                            0.35 - light.x, // G
                            1.0, // B
                            1.0);  // A
  		//}
        	

    }
	`,
	  transparent: true,
	  blending:       THREE.NormalBlending,
		depthTest:      false,
		uniforms : uniforms
	});
	*/

  var shaderMaterial = new THREE.ShaderMaterial({
		vertexShader: `
		attribute float alpha;
		attribute float index_;

		uniform float time;
		uniform float pulseStrength;

		varying float alpha_;
		varying vec3  myPos;
		varying float distToCamera;
  		
  		void main()
  		{
  			myPos = vec3(
  	  			position.x,
  				position.y*0.8+2000.0*sin(position.x*0.0003-0.3),
  				position.z*0.7-position.z*sin(position.x*0.0003-0.3)*0.2-1000.0*sin(position.x*0.0003-0.3)
  			 			);

  			alpha_ = log(alpha)*0.01+sin(time)*pulseStrength;
          	vec4 pos_gl =  modelViewMatrix * vec4(myPos, 1.0);
           distToCamera = -pos_gl.z *0.00009;
        	gl_PointSize = 1.4/distToCamera;
        	gl_Position = projectionMatrix * pos_gl;


  		}
		`,
		fragmentShader: `
      	varying vec3 myPos;
		varying float alpha_;
		varying float distToCamera;

		uniform float clipping_threshold_end;
		uniform float clipping_threshold_start;
		uniform sampler2D texture;

  		void main(){
  		if (myPos.x > clipping_threshold_start || myPos.x < clipping_threshold_end){
  			discard;
  		}else{
        	gl_FragColor = vec4( 0.8*(myPos.z+4000.0)*0.0002,
                           		0.15-(myPos.x+2000.0)*0.0001,
                            	1.0/distToCamera,
                            	alpha_+0.1)
                            	* texture2D( texture, gl_PointCoord );  // A
  		}
        	

    }
	`,
	  transparent: true,
	  blending:       THREE.AdditiveBlending,
		depthTest:      false,
		uniforms : uniforms
	});
	
  var shaderMaterialLines = new THREE.ShaderMaterial({
		vertexShader: `
		attribute float alpha;
		attribute float index_;

		uniform float time;
		uniform float pulseStrength;

		varying float alpha_;
		varying vec3  myPos;
		varying float distToCamera;
  		
  		void main()
  		{
  			myPos = vec3(
  	  			position.x,
  				position.y*0.8+2000.0*sin(position.x*0.0003-0.3),
  				position.z*0.7-position.z*sin(position.x*0.0003-0.3)*0.2-1000.0*sin(position.x*0.0003-0.3)
  			);
  			alpha_ = log(alpha)*0.015+sin(time)*pulseStrength;
          	vec4 pos_gl =  modelViewMatrix * vec4(myPos, 1.0);
           distToCamera = -pos_gl.z *0.00009;
        	gl_Position = projectionMatrix * pos_gl;


  		}
		`,
		fragmentShader: `
      	varying vec3 myPos; 
		varying float alpha_;
		varying float distToCamera;

		uniform float clipping_threshold_end;
		uniform float clipping_threshold_start;

  		void main(){
  		if (myPos.x > clipping_threshold_start || myPos.x < clipping_threshold_end){
  			discard;
  		}else{
        	gl_FragColor = vec4( 0.9*(myPos.z+4000.0)*0.0002,
                           		0.15-(myPos.x+2000.0)*0.0001,
                            	1.0/distToCamera,
                            	alpha_);
  		}
        	

    }
	`,
	  	transparent: true,
		uniforms : uniforms,
		//alphaTest : 0.5,
		blending : THREE.NormalBlending,
		//blendEquation : THREE.AddEquation,
		//blending : THREE.CustomBlending,
		//blendSrc : THREE.SrcAlphaFactor,
    //blendDst : THREE.OneMinusSrcAlphaFactor,
		//depthFunc :  THREE.NeverDepth,
		//premultipliedAlpha : true
	});
	



	// create the particle system
	pointCloud = new THREE.Points( geometry, shaderMaterial );
  	pointCloud.visible = effectController.showDots;
	group.add( pointCloud );

	linesMesh = new THREE.LineSegments( geometry, shaderMaterialLines );
	group.add(linesMesh);
	linesMesh.frustumCulled = false;
	//

	//sphere = new THREE.Mesh(new THREE.SphereGeometry(1000,64,64), new THREE.MeshBasicMaterial({color:0xff7777}))
	//scene.add(sphere);
	//sphere.position.copy(controls.target)
/*
	var tube = new THREE.Mesh(new THREE.CylinderGeometry(500,500, 2000,5,5), new THREE.MeshBasicMaterial({color:0xff7777}))
	pointCloud.add(tube);
*/
	linesMesh.rotateZ(-Math.PI*0.3 );
	pointCloud.rotateZ( -Math.PI*0.3);
	linesMesh.rotateX( -Math.PI*0.3 );
	pointCloud.rotateX( -Math.PI*0.3);
	renderer = new THREE.WebGLRenderer( { antialias: true} );
	renderer.setPixelRatio( window.devicePixelRatio ? window.devicePixelRatio : 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.autoClear = false;
	renderer.sortObjects = false;
	renderer.toneMapping = THREE.LinearToneMapping;
	renderer.setClearColor(0x020202,1 )


	renderScene = new THREE.RenderPass(scene, camera);
    msaaRenderPassP = new THREE.ManualMSAARenderPass( scene, camera,new THREE.Color().setHex( 0x000000), 1 );
    msaaRenderPassP.sampleLevel = (2);
	var copyShader = new THREE.ShaderPass(THREE.CopyShader);
	copyShader.renderToScreen = true;


	//resolution, strength, radius, threshold 
	bloomPass = new THREE.UnrealBloomPass(
	  new THREE.Vector2(window.innerWidth, window.innerHeight),
	  params.bloomStrength, params.bloomRadius, params.bloomThreshold);
	composer = new THREE.EffectComposer(renderer);
	
	var pixelRatio = window.devicePixelRatio || 1;
  composer.setSize(window.innerWidth * pixelRatio,  window.innerHeight * pixelRatio);
	//composer.setSize(window.innerWidth, window.innerHeight);
	composer.addPass(renderScene);
	composer.addPass(msaaRenderPassP);
	composer.addPass(bloomPass);
	composer.addPass(copyShader);
	container.appendChild( renderer.domElement );

	//


	window.addEventListener( 'resize', onWindowResize, false );

	// update the tweens from TWEEN library
	
	iniciate();
	animate();

	

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	var pixelRatio = window.devicePixelRatio || 1;
  composer.setSize(window.innerWidth * pixelRatio,  window.innerHeight * pixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );
}

var numOld = 0;  
var ran =1;
var ran2 =2;

var r12 = r*7.5;

function pushCloud() {

  	var vertexpos = 0;
  	var colorpos = 0;
  	var numConnected = 0;
  	var minDist = Math.pow(effectController.minDistance,2);
  	var i = particleCount;
  	while(i--) {
  		
  		particlesData[ i ].numConnections = 0;

  		// get the particle
  		var particleData = particlesData[i];
  

  		var pushBack = 0;
  		if (u_time % 250 == 0){
  			ran = Math.random()*10;
  		}
  		if (u_time % 150 == 0){
  			ran2 = Math.random()*2;
  		}

  		if (particlePositions[ i * 3 ] < -r12) {
  			perlinNoise = simplex.noise3D(particlePositions[ i * 3],particlePositions[ i * 3 +1],particlePositions[ i * 3 +2]);
  			//if (i%2 == 0){
  				//particlePositions[ i * 3 +1] = Math.sin(u_time*0.0151*ran)*2500*perlinNoise+Math.pow(i%10+1,2);//Math.random();
  				//particlePositions[ i * 3 +2] = Math.sin(u_time*0.0151*ran)*2500*perlinNoise+Math.pow(i%50+1,2);//Math.random();
  			//}else{
  				//particlePositions[ i * 3 +1] = //*2+Math.pow(	i%10+1,2);//Math.random();
  			//	particlePositions[ i * 3 +2] = perlinNoise*5000*Math.sin(i*u_time*0.151)//*2+Math.pow(	i%50+1,2);//Math.random();
  			
    		

    		
  			//}
  		  	pushBack = r12;
  		} else {
  		  	pushBack = -effectController.speed*50-effectController.speed*Math.floor(i/32);
  		}
  	


  		particlePositions[ i * 3 ] += pushBack;


  		if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
  			continue;
  
  		// Check collision

  		for ( var j = i + 1; j < particleCount; j++ ) {
  
  			var particleDataB = particlesData[ j ];
  			if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
  				continue;

  			var i3 = i*3;
  			var j3 = j*3;
  			var dx = particlePositions[ i3     ] - particlePositions[ j3     ];
			dx *=dx;
  			var dy = particlePositions[ i3 + 1 ] - particlePositions[ j3 + 1 ];
			dy *=dy;
  			var dz = particlePositions[ i3 + 2 ] - particlePositions[ j3 + 2 ];
  			dz *=dz;
  			var dist =  dx + dy + dz ;
  
  			if ( dist < minDist ) {
  				//var dist = Math.sqrt(dist);

  				particleData.numConnections++;
  				particleDataB.numConnections++;

  				var alpha = (minDist- dist) ;
  				  
  				positions[ vertexpos++ ] = particlePositions[ i3     ];
  				positions[ vertexpos++ ] = particlePositions[ i3 + 1 ];
  				positions[ vertexpos++ ] = particlePositions[ i3 + 2 ];
  
  				positions[ vertexpos++ ] = particlePositions[ j3     ];
  				positions[ vertexpos++ ] = particlePositions[ j3 + 1 ];
  				positions[ vertexpos++ ] = particlePositions[ j3 + 2 ];
  
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;

  				numConnected++;
  			}
  		}
  	}
  

  		linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
  	

}


function iniciate() {

  	var i = particleCount;
  	while(i--) {

  		var pushBack = 0;

  		if (particlePositions[ i * 3 ] < -r12) {
  		  	pushBack = r12;
  		} else {
  		  	pushBack = -effectController.speed*50-effectController.speed*Math.floor(i/32+1)*2000;
  		}
  		particlePositions[ i * 3 ] += pushBack;
  	}
  
}

function animate() {
	u_time ++;
	//effectController.minDistance += Math.sin(u_time*0.1)
	uniforms.time.value = u_time*0.1*effectController.timeAcceleration;
	alpha_time = Math.pow(Math.sin(u_time*effectController.timeAcceleration),4) ;
	stats.begin();
	renderer.toneMappingExposure = Math.pow( params.exposure, 4.0 );
	controls.update();
    pushCloud();
	render();
	requestAnimationFrame( animate );
	stats.end();
	  	linesMesh.geometry.attributes.position.needsUpdate = true;
  	linesMesh.geometry.attributes.alpha.needsUpdate = true;	  
}

function render() {
	if (effectController.bloom){
	  renderer.clear();
		composer.render();
		renderer.clearDepth();


	}else{
		renderer.render( scene, camera );
	}


}

function generateCircleTexture() {

        // draw a circle in the center of the canvas
        var size = 64;

        // create canvas
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        // get context
        var context = canvas.getContext('2d');

        // draw circle
        var centerX = size / 2;
        var centerY = size / 2;
        var radius = size / 2;

        for(var i = 1; i < 33; i++) {
          context.beginPath();
          context.arc(centerX, centerY, (radius / 2) + (i / 2), 0, 2 * Math.PI, false);
          context.fillStyle = "rgba(255, 255, 255, " + (1 / i) + ")";
          context.fill();
        }

        return canvas;
      }
