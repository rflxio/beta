var startTime	= Date.now();
var group;
var container, controls, stats;
var particlesData = [];
var camera, scene, renderer;
var positions, colors;
var particles;
var pointCloud;
var particlePositions, particleTo, particleSnapshot;
var linesMesh;

var perlinScale3D = 8;
var perlinScale2D = 2600;
var factor = 1;
var epsilon = 0.001;
var tick = 3;
var snapshotTaken = false;

var maxParticleCount = 2000;
var particleCount = 2000;
var r = 700;
var rHalf = r / 4;

var nx = 10;
var ny = 10;
var nz = 40;

var fx = r / nx;
var fy = r / ny;
var fz = r / nz;

var simplex = new SimplexNoise();

var effectController = {
	factor: factor,
	epsilon: epsilon,
	showDots: true,
	showLines: true,
	minDistance: 70 * perlinScale3D,
	particleCount: particleCount,
	maxConnections: 50,
	limitConnections: false,
	rotSpeed: 2.0,
	speed: 0
};

// maybe replace that by window... or something
var userOpts	= {
	range		: 200,
	duration	: 9000,
	delay		: 300,
	easing		: 'Linear.EaseNone'
};


init();
animate();

function setupTween()
{
	// 
	var update	= function(){
//  camera.position.x += effectController.speed; 
//  camera.position.x = resetCameraX(camera.position.x); 

  	var vertexpos = 0;
  	var colorpos = 0;
  	var numConnected = 0;
  
  	for ( var i = 0; i < particleCount; i++ )
  		particlesData[ i ].numConnections = 0;
  
  	for ( var i = 0; i < particleCount; i++ ) {
  

  		// get the particle
  		var particleData = particlesData[i];
  
      var x = particlePositions[ i * 3     ] / 200;
      var y = particlePositions[ i * 3 + 1 ] / 200;
      var z = particlePositions[ i * 3 + 2 ] / 200;
  
  		var F0 = simplex.noise3D(x,y,z);
  		var Fx = simplex.noise3D(x + epsilon,y,z);
  		var Fy = simplex.noise3D(x,y + epsilon,z);
  		var Fz = simplex.noise3D(x,y,z + epsilon);
  
  		particleData.velocity.x += (Fx - F0) / epsilon / 100;
  		particleData.velocity.y += (Fy - F0) / epsilon / 100;
  		particleData.velocity.z += (Fz - F0) / epsilon / 100;
  
  		particlePositions[ i * 3     ] += particleData.velocity.x;
  		particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
  		particlePositions[ i * 3 + 2 ] += particleData.velocity.z;
  
  //		particlePositions[ i * 3     ] = current[ i * 3     ];
  //		particlePositions[ i * 3 + 1 ] = current[ i * 3 + 1 ];
  //		particlePositions[ i * 3 + 2 ] = current[ i * 3 + 2 ];
  
  		// if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
  		// 	particleData.velocity.y = -particleData.velocity.y;
  
  		// if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
  		// 	particleData.velocity.x = -particleData.velocity.x;
  
  		// if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
  		// 	particleData.velocity.z = -particleData.velocity.z;
  
  		if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
  			continue;
  
  		// Check collision
  		for ( var j = i + 1; j < particleCount; j++ ) {
  
  			var particleDataB = particlesData[ j ];
  			if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
  				continue;
  
  			var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
  			var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
  			var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
  			var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
  
  			if ( dist < effectController.minDistance ) {
  
  				particleData.numConnections++;
  				particleDataB.numConnections++;
  
  				var alpha = 1.0 - dist / effectController.minDistance;
  
  				positions[ vertexpos++ ] = particlePositions[ i * 3     ];
  				positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
  				positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];
  
  				positions[ vertexpos++ ] = particlePositions[ j * 3     ];
  				positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
  				positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];
  
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  
  				numConnected++;
  			}
  		}
  	}
  
  
  	linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
  	linesMesh.geometry.attributes.position.needsUpdate = true;
  	linesMesh.geometry.attributes.color.needsUpdate = true;
  
  	pointCloud.geometry.attributes.position.needsUpdate = true;
	  
	}

	var current	= particlePositions;

	// remove previous tweens if needed
	TWEEN.removeAll();
	
	// convert the string from dat-gui into tween.js functions 
	var easing	= TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
	// build the tween to go ahead
	var tweenHead	= new TWEEN.Tween(current)
		.to(particleTo, userOpts.duration)
		.delay(userOpts.delay)
		.easing(easing)
		.onUpdate(update);
	//	.call(handleComplete);

	// build the tweens to go sideways
	var tweenShiftA	= new TWEEN.Tween(current)
		.to(particleTo, userOpts.duration)
		.delay(userOpts.delay)
		.easing(easing)
		.onUpdate(update);
	//	.call(handleComplete);

	var tweenShiftB	= new TWEEN.Tween(current)
		.to(particleTo, userOpts.duration)
		.delay(userOpts.delay)
		.easing(easing)
		.onUpdate(update);
	//	.call(handleComplete);

	// after tweenHead do tweenBack
	tweenHead.chain(tweenShiftA);

	// after tweenShiftA do tweenShiftB
//	tweenShiftA.chain(tweenShiftB);
	// after tweenShiftB do tweenShiftA, so it is cycling
//	tweenShiftB.chain(tweenShiftA);

	// start the first
	tweenHead.start();

}




function initGUI() {
	var gui = new dat.GUI();

	gui.add( effectController, "showDots" ).onChange( function( value ) {
	  pointCloud.visible = value;
	});
	
	gui.add(effectController, "showLines").onChange( function( value ) {
	  linesMesh.visible = value;
	});
	gui.add(effectController, "minDistance", 10, 300 * perlinScale3D).onChange(function (value) {
//	  distances();
    pushCloud();
	});
	gui.add(effectController, "limitConnections").onChange(function (value) {
//	  distances();
    pushCloud();
	});
	gui.add(effectController, "maxConnections", 0, 30, 1 ).onChange(function (value) {
//	  distances();
    pushCloud();
	});
	gui.add(effectController, "factor", 0, 5, 1).onChange( function( value ) {
	  factor = value;
    initPositions();
//	  distances();
    pushCloud();
	});
	gui.add(effectController, "epsilon", 0.00001, 0.5, 1 ).onChange( function( value ) {
	  epsilon = value;
    initPositions();
//	  distances();
    pushCloud();
	});
	gui.add(effectController, "particleCount", 0, maxParticleCount).onChange( function( value ) {
		particleCount = parseInt( value );
		particles.setDrawRange( 0, particleCount );
//	  distances();
    pushCloud();
	});
	gui.add(effectController, "rotSpeed", 0, 20, 1 ).onChange(function (value) {
	  rotSpeed = value;
	  controls.autoRotateSpeed =effectController.rotSpeed * rotSpeedMul;
	});
	gui.add(effectController, "speed", 0, 40, 1 ).onChange(function (value) {
	  speed = value;
	});
}


function initPositions() {
  var index = 0;
  var perlinPoint;
  
	for (var i = 0; i < nx; i++) {
	  for (var j = 0; j < ny; j++) {
	    for (var k = 0; k < nz; k++) {
    		var x = ( (i * fx * 2) - r + fx / 2) * perlinScale3D;
    		var y = (j * fy - rHalf + fy / 2) * perlinScale3D * 3/5;
    		var z = (k * fz / 10 - r/10) * perlinScale3D;
    		
    		perlinNoise = simplex.noise3D(x,y,z);

//    		particlePositions[index] = x;
//    		particlePositions[index] = x;
    		particlePositions[index] = x + ( fx * 2 * ( (simplex.noise3D(x + epsilon, y, z) - perlinNoise) / epsilon ) );
    		particleTo[index++] = x + ( fx * 2 * ( (simplex.noise3D(x + epsilon * factor, y, z) - perlinNoise) / epsilon * factor ) );
//    		particleTo[index++] = ( (simplex.noise3D(x + epsilon * factor, y, z) - perlinNoise) / epsilon * factor );
    		
//    		particlePositions[index] = y;
//    		particlePositions[index] = y;
    		particlePositions[index] =  y + ( fy * ( (simplex.noise3D(x, y + epsilon, z) - perlinNoise) / epsilon ) ) + (simplex.noise2D(z * perlinScale3D, y * perlinScale3D) * perlinScale2D * 3/5);
    		particleTo[index++] =  y + ( fy * ( (simplex.noise3D(x, y + epsilon * factor, z) - perlinNoise) / epsilon * factor ) ) + (simplex.noise2D(z * perlinScale3D, y * perlinScale3D) * perlinScale2D/2 * 3/5);
//    		particleTo[index++] = ( (simplex.noise3D(x, y + epsilon * factor, z) - perlinNoise) / epsilon * factor );
    		
//    		particlePositions[index] = 0;
//    		particlePositions[index] = z;
    		particlePositions[index] =  z + ( fz * ( (simplex.noise3D(x, y, z + epsilon * factor) - perlinNoise) / epsilon * factor) ) + (simplex.noise2D(x * perlinScale3D, y * perlinScale3D) * perlinScale2D) + (-y * perlinScale3D / 10);
    		particleTo[index++] =  z + ( fz * ( (simplex.noise3D(x, y, z + epsilon * factor) - perlinNoise) / epsilon * factor) ) + (simplex.noise2D(x * perlinScale3D, y * perlinScale3D) * perlinScale2D) + (-y * perlinScale3D / 10);
//    		particleTo[index++] = ( (simplex.noise3D(x, y, z + epsilon) - perlinNoise) / epsilon);


    		// var F0 = simplex.noise3D(x,y,z);
    		// var Fx = simplex.noise3D(x + epsilon,y,z);
    		// var Fy = simplex.noise3D(x,y + epsilon,z);
    		// var Fz = simplex.noise3D(x,y,z + epsilon);

    		// particlePositions[index++] = x + (Fx - F0) / epsilon * factor;
    		// particlePositions[index++] = y + (Fy - F0) / epsilon * factor;
    		// particlePositions[index++] = z + (Fz - F0) / epsilon * factor;

    		// add it to the geometry
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

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1100 * perlinScale3D, 4000 * perlinScale3D );
	camera.position.x = 1290 * perlinScale3D;
	camera.position.y = 450 * perlinScale3D;
	camera.position.z = 630 * perlinScale3D;

	controls = new THREE.OrbitControls( camera, container );

	// These variables set the camera behaviour and sensitivity.
	controls.rotateSpeed = .8;
	controls.zoomSpeed = .25;
	controls.panSpeed = 1;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 1;
	controls.minDistance = 1400 * perlinScale3D;
	controls.maxDistance = 20;
	controls.minPolarAngle = 15 * (Math.PI/180); // radians
	controls.maxPolarAngle = 165 * (Math.PI/180); // radians
	controls.autoRotate = true;
	controls.autoRotateSpeed =effectController.rotSpeed * rotSpeedMul;



	scene = new THREE.Scene();

	group = new THREE.Group();
	scene.add( group );

	var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );

	helper.material.color.setHex( 0x080808 );
	helper.material.blending = THREE.AdditiveBlending;
	helper.material.transparent = true;

	group.add( helper );

	var segments = maxParticleCount * maxParticleCount;

	colors = new Float32Array( segments * 3 );
	positions = new Float32Array( segments * 3 );

	var pMaterial = new THREE.PointsMaterial({
		color: 0x2222FF,
		size: 2,
		blending: THREE.AdditiveBlending,
		transparent: true,
		sizeAttenuation: false
	});

	particles = new THREE.BufferGeometry();
	particlePositions = new Float32Array(maxParticleCount * 3);
	particleTo = new Float32Array(maxParticleCount * 3);
	particleSnapshot = new Float32Array(maxParticleCount * 3);

  initPositions();
	// initial setup of the tweens
	setupTween();

	particles.setDrawRange(0, particleCount );
	particles.addAttribute('position', new THREE.BufferAttribute( particlePositions, 3 ).setDynamic( true ) );

	// create the particle system
	pointCloud = new THREE.Points( particles, pMaterial );
  pointCloud.visible = effectController.showDots;
	group.add( pointCloud );

	var geometry = new THREE.BufferGeometry();

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setDynamic( true ) );

	geometry.computeBoundingSphere();

	geometry.setDrawRange( 0, 0 );

  var shaderMaterial = new THREE.ShaderMaterial({
		vertexShader: `
      varying vec3 pos;
      
      #ifdef GL_ES
  		// precision highp float;
  		#endif
  		
  		void main()
  		{
          pos = position;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  		}
		`,
		fragmentShader: `
      // same name and type as VS
      varying vec3 pos;

      #ifdef GL_ES
  		// precision highp float;
  		#endif
  		
  		void main()
  		{
        vec3 light = pos;
  //      vec3 temp = vec3(1.0,1.0,1.0);
  //      float depth = (length(camera.position - light*temp) - 1.0) / 49.0;
  //      vec4 cs_position = glModelViewMatrix * gl_Vertex;
  //      vec4 clipSpace = orthographicMatrix * vec4(position, 1.0);
  //    
        
        // ensure it's normalized
        light = normalize(light) * 0.5;
      
        // calculate the dot product of
        // the light to the vertex normal
        // float dProd = max(0.0, dot(pos, light));
      
        // feed into our frag colour
        gl_FragColor = vec4(0.05 + light.x, // R
                            0.05 - light.x, // G
                            1, // B
                            0.75);  // A
    }
	`,
	  transparent: true
	});
	
	var material = new THREE.LineBasicMaterial({
		transparent: true,
		vertexColors: THREE.VertexColors,
		blending: THREE.AdditiveBlending
	});

	linesMesh = new THREE.LineSegments( geometry, shaderMaterial );
	group.add(linesMesh);

	//

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	container.appendChild( renderer.domElement );

	//

	stats = new Stats();
	container.appendChild( stats.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
	
//	distances();
	// update the tweens from TWEEN library
	TWEEN.update();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function distances() {
	var vertexpos = 0;
	var colorpos = 0;
	var numConnected = 0;

	for ( var i = 0; i < particleCount; i++ )
		particlesData[ i ].numConnections = 0;

	for ( var i = 0; i < particleCount; i++ ) {

		// get the particle
		var particleData = particlesData[i];

    var x = particlePositions[ i * 3     ] / 200;
    var y = particlePositions[ i * 3 + 1 ] / 200;
    var z = particlePositions[ i * 3 + 2 ] / 200;

		var F0 = simplex.noise3D(x,y,z);
		var Fx = simplex.noise3D(x + epsilon,y,z);
		var Fy = simplex.noise3D(x,y + epsilon,z);
		var Fz = simplex.noise3D(x,y,z + epsilon);

		particleData.velocity.x += (Fx - F0) / epsilon / 100;
		particleData.velocity.y += (Fy - F0) / epsilon / 100;
		particleData.velocity.z += (Fz - F0) / epsilon / 100;

		particlePositions[ i * 3     ] += particleData.velocity.x;
		particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
		particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

//		particlePositions[ i * 3     ] = current[ i * 3     ];
//		particlePositions[ i * 3 + 1 ] = current[ i * 3 + 1 ];
//		particlePositions[ i * 3 + 2 ] = current[ i * 3 + 2 ];

		// if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
		// 	particleData.velocity.y = -particleData.velocity.y;

		// if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
		// 	particleData.velocity.x = -particleData.velocity.x;

		// if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
		// 	particleData.velocity.z = -particleData.velocity.z;

		if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
			continue;

		// Check collision
		for ( var j = i + 1; j < particleCount; j++ ) {

			var particleDataB = particlesData[ j ];
			if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
				continue;

			var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
			var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
			var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
			var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

			if ( dist < effectController.minDistance ) {

				particleData.numConnections++;
				particleDataB.numConnections++;

				var alpha = 1.0 - dist / effectController.minDistance;

				positions[ vertexpos++ ] = particlePositions[ i * 3     ];
				positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
				positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];

				positions[ vertexpos++ ] = particlePositions[ j * 3     ];
				positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
				positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];

				colors[ colorpos++ ] = alpha;
				colors[ colorpos++ ] = alpha;
				colors[ colorpos++ ] = alpha;

				colors[ colorpos++ ] = alpha;
				colors[ colorpos++ ] = alpha;
				colors[ colorpos++ ] = alpha;

				numConnected++;
			}
		}
	}


	linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
	linesMesh.geometry.attributes.position.needsUpdate = true;
	linesMesh.geometry.attributes.color.needsUpdate = true;

	pointCloud.geometry.attributes.position.needsUpdate = true;
}


function pushCloud() {


//  camera.position.x += effectController.speed; 
//  camera.position.x = resetCameraX(camera.position.x); 

  	var vertexpos = 0;
  	var colorpos = 0;
  	var numConnected = 0;
  
  	for ( var i = 0; i < particleCount; i++ )
  		particlesData[ i ].numConnections = 0;
  
  	for ( var i = 0; i < particleCount; i++ ) {
  

  		// get the particle
  		var particleData = particlesData[i];
  
      var x = particlePositions[ i * 3     ] / 200;
      var y = particlePositions[ i * 3 + 1 ] / 200;
      var z = particlePositions[ i * 3 + 2 ] / 200;
  
  		var F0 = simplex.noise3D(x,y,z);
  		var Fx = simplex.noise3D(x + epsilon,y,z);
  		var Fy = simplex.noise3D(x,y + epsilon,z);
  		var Fz = simplex.noise3D(x,y,z + epsilon);
  		var pushBack = 0;
  		
  		if (particlePositions[ i * 3     ] < -r*2.5) {
  		  pushBack = r*5;
  		} else {
  		  pushBack = -effectController.speed;
  		}
  
  		particleData.velocity.x += (Fx - F0) / epsilon / 100;
  		particleData.velocity.y += (Fy - F0) / epsilon / 100;
  		particleData.velocity.z += (Fz - F0) / epsilon / 100;
  
  //		particlePositions[ i * 3     ] += particleData.velocity.x;
  //		particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
  //		particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

  		particlePositions[ i * 3     ] += pushBack;
  
  //		particlePositions[ i * 3     ] = current[ i * 3     ];
  //		particlePositions[ i * 3 + 1 ] = current[ i * 3 + 1 ];
  //		particlePositions[ i * 3 + 2 ] = current[ i * 3 + 2 ];
  
  		// if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
  		// 	particleData.velocity.y = -particleData.velocity.y;
  
  		// if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
  		// 	particleData.velocity.x = -particleData.velocity.x;
  
  		// if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
  		// 	particleData.velocity.z = -particleData.velocity.z;
  
  		if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
  			continue;
  
  		// Check collision
  		for ( var j = i + 1; j < particleCount; j++ ) {
  
  			var particleDataB = particlesData[ j ];
  			if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
  				continue;
  
  			var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
  			var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
  			var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
  			var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
  
  			if ( dist < effectController.minDistance ) {
  
  				particleData.numConnections++;
  				particleDataB.numConnections++;
  
  				var alpha = 1.0 - dist / effectController.minDistance;
  
  				positions[ vertexpos++ ] = particlePositions[ i * 3     ];
  				positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
  				positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];
  
  				positions[ vertexpos++ ] = particlePositions[ j * 3     ];
  				positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
  				positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];
  
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  				colors[ colorpos++ ] = alpha;
  
  				numConnected++;
  			}
  		}
  	}
  
  
  	linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
  	linesMesh.geometry.attributes.position.needsUpdate = true;
  	linesMesh.geometry.attributes.color.needsUpdate = true;
  
  	pointCloud.geometry.attributes.position.needsUpdate = true;
	  
	}


function animate() {
  
	stats.update();
	render();
	controls.update();
	
  //	distances();
  //	TWEEN.update();
    pushCloud()

	requestAnimationFrame( animate );
}

function render() {

//	var time = Date.now() * 0.001;

// 	group.rotation.y = time * 0.1;
	renderer.render( scene, camera );

}
