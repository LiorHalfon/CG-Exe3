
// Globals:
//===========
var paddleRadius = 15;
var paddleThickness = 2;

var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 5, paddleMaxSpeed = 8;
var hitStr = 4;
var isSpacePressed = false, spaceKeyTimer = 0, INITIAL_SPACE_KEY_TIME = 800;
////////////////////////////

function Paddle() {
    this.paddle = new THREE.Object3D();
    this.paddleRadiusSegments = 20;

    // Paddle handle:
    this.handleHeight = paddleThickness;
    this.handleWidth = 4;
    this.handleDepth = 12;

    this.createPaddle = function(){
        // Create Paddle 2 side planes
        var paddleGeometry = new THREE.CircleGeometry(paddleRadius, paddleRadius,
            paddleThickness,
            this.paddleRadiusSegments);
        var paddleGeometry = new THREE.CircleGeometry(paddleRadius,
            this.paddleRadiusSegments);

        var paddleTexture = THREE.ImageUtils.loadTexture("textures/blue-paddle-texture.jpg");

        var paddleMaterial = new THREE.MeshLambertMaterial({
            map: paddleTexture,
            color: 0x444499
        });
        paddleMaterial.side = THREE.DoubleSide;

        var paddleMesh = new THREE.Mesh(paddleGeometry, paddleMaterial);
        paddleMesh.castShadow = true;
        paddleMesh.receiveShadow = true;

        paddleMesh.rotation.y = deg90;
        paddleMesh.rotation.x = deg90;
        paddleMesh.rotation.z = -deg90;

        var paddleMesh2 = paddleMesh.clone();
        paddleMesh.position.x = -paddleThickness/2;
        paddleMesh2.position.x = paddleThickness/2;

        this.paddle.add(paddleMesh);
        this.paddle.add(paddleMesh2);

        // Create wrapping of the paddle
        var wrapGeo = new THREE.CylinderGeometry( paddleRadius, paddleRadius,
            paddleThickness, this.paddleRadiusSegments, 1,
        true
        );

        var wrapMat = new THREE.MeshLambertMaterial({color: 0x111111});
        var wrap = new THREE.Mesh(wrapGeo, wrapMat);
        wrap.rotation.z = deg90;
        this.paddle.add(wrap);

        // Create Handle
        var handleGeometry = new THREE.CubeGeometry(this.handleWidth,
            this.handleHeight,
            this.handleDepth);

        var handleMaterial = new THREE.MeshLambertMaterial({color: 0x777777,
           map: THREE.ImageUtils.loadTexture("textures/wood.jpg")});

        var handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
        handleMesh.castShadow = true;
        handleMesh.receiveShadow = true;
        handleMesh.position.z = -paddleRadius - this.handleDepth/2;
        handleMesh.rotation.z = deg90;

        this.paddle.add(handleMesh);

        return this.paddle;
    };
    return true;
}