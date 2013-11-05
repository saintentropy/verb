var should = require('should')
	, VERB = require('../build/VERB.js');



describe("nurbs",function(){

	it('knot_span_given_n', function(){

		var n = 7
			, degree = 2
			, knot_vector = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		should.equal( 4, VERB.eval.nurbs.knot_span_given_n( n, degree, 2.5, knot_vector ) );
		should.equal( 3, VERB.eval.nurbs.knot_span_given_n( n, degree, 1, knot_vector ) );
		should.equal( 3, VERB.eval.nurbs.knot_span_given_n( n, degree, 1.5, knot_vector ) );
		should.equal( 7, VERB.eval.nurbs.knot_span_given_n( n, degree, 4.9, knot_vector ) );
		should.equal( 7, VERB.eval.nurbs.knot_span_given_n( n, degree, 10, knot_vector ) );
		should.equal( 7, VERB.eval.nurbs.knot_span_given_n( n, degree, 5, knot_vector ) );
		should.equal( 2, VERB.eval.nurbs.knot_span_given_n( n, degree, 0, knot_vector ) );
		should.equal( 2, VERB.eval.nurbs.knot_span_given_n( n, degree, -1, knot_vector ) );

	});

	it('knot_span', function(){

		var degree = 2
			, knot_vector = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		should.equal( 4, VERB.eval.nurbs.knot_span( degree, 2.5, knot_vector ) );
		should.equal( 3, VERB.eval.nurbs.knot_span( degree, 1, knot_vector ) );
		should.equal( 3, VERB.eval.nurbs.knot_span( degree, 1.5, knot_vector ) );
		should.equal( 7, VERB.eval.nurbs.knot_span( degree, 4.9, knot_vector ) );
		should.equal( 7, VERB.eval.nurbs.knot_span( degree, 10, knot_vector ) ); // above span
		should.equal( 7, VERB.eval.nurbs.knot_span( degree, 5, knot_vector ) ); // top of span
		should.equal( 2, VERB.eval.nurbs.knot_span( degree, 0, knot_vector ) ); // bottom span

	});

	it('basis_functions, basis_functions_given_knot_span_index', function(){

		var degree = 2
			, span = 4
			, knot_vector = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		var N1 = VERB.eval.nurbs.basis_functions_given_knot_span_index( 4, 2.5, degree, knot_vector );
		should.equal( 3, N1.length );
		should.equal( 0.125, N1[0] );
		should.equal( 0.75, N1[1] );
		should.equal( 0.125, N1[2] );

		var N2 = VERB.eval.nurbs.basis_functions( 2.5, degree, knot_vector );
		should.equal( 3, N2.length );
		should.equal( 0.125, N2[0] );
		should.equal( 0.75, N2[1] );
		should.equal( 0.125, N2[2] );

	});

	it('deriv_basis_functions_given_n_i', function(){

		// This needs to be tested better
		var degree = 2
			, n = 7
			, span = 4
			, knot_vector = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		var N1 = VERB.eval.nurbs.deriv_basis_functions_given_n_i( span, 2.5, degree, n, knot_vector );
		// weights
		should.equal( 0.125, N1[0][0] );
		should.equal( 0.75, N1[0][1] );
		should.equal( 0.125, N1[0][2] );

		// derivatives
		should.equal( -0.5, N1[1][0] );
		should.equal( 1, N1[2][0] );
		should.equal( 0, N1[1][1] );
		should.equal( -2, N1[2][1] );
		should.equal( 0.5, N1[1][2] );
		should.equal( 1, N1[2][2] );

		// length 
		should.equal( n + 1, N1.length );
		should.equal( degree + 1, N1[0].length );

	});

	it('curve_point', function(){

		var degree = 2
			, n = 6
			, knot_vector = [0, 0, 0, 1, 2, 3, 4, 5, 5, 5]
			, control_points = [ [10, 0], [20, 10], [30, 20], [40, 30], [50, 40], [60, 30], [70, 80]];

		var p = VERB.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, 2.5);

		should.equal( p[0], 40 );
		should.equal( p[1], 30 );

		var p_start = VERB.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, 0);

		should.equal( p_start[0], 10 );
		should.equal( p_start[1], 0 );

		var p_end = VERB.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, 5);

		should.equal( p_end[0], 70 );
		should.equal( p_end[1], 80 );

	});

	it('are_valid_relations', function(){

		should.equal( false, VERB.eval.nurbs.are_valid_relations( 0, 0, 0 ) );
		should.equal( true, VERB.eval.nurbs.are_valid_relations( 2, 2, 5 ) );

		

	});

	it('curve_point', function(){

		var degree = 3
			, n = 4
			, u = 0
			, knot_vector = [0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ];

		var p = VERB.eval.nurbs.curve_point( degree, knot_vector, control_points, u);

		should.equal( p[0], 10 );
		should.equal( p[1], 0 );

		var p2 = VERB.eval.nurbs.curve_point( degree, knot_vector, control_points, 1.0);

		should.equal( p2[0], 50 );
		should.equal( p2[1], 50 );

		

	});

	it('curve_derivs_given_n', function(){

		// This needs to be tested better
		var degree = 3
			, n = 3
			, u = 0
			, knot_vector = [0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, num_derivs = 2;

		var p = VERB.eval.nurbs.curve_derivs_given_n( n, degree, knot_vector, control_points, u, num_derivs ) ;

		should.equal( p[0][0], 10 );
		should.equal( p[0][1], 0 );
		should.equal( p[1][0] / p[1][1], 1 );

		// add more derivatives here

		

	});

	it('curve_derivs', function(){

		// This needs to be tested better
		var degree = 3
			, u = 0
			, knot_vector = [0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, num_derivs = 2;

		var p = VERB.eval.nurbs.curve_derivs( degree, knot_vector, control_points, u, num_derivs ) ;

		should.equal( p[0][0], 10 );
		should.equal( p[0][1], 0 );
		should.equal( p[1][0] / p[1][1], 1 );

	
	});

	it('surface_point_given_n_m', function(){

		// This needs to be tested better
		var degree_u = 3
			, degree_v = 3
			, knot_vector_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knot_vector_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3;

		var p = VERB.eval.nurbs.surface_point_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, 0, 0 );
		
		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		p = VERB.eval.nurbs.surface_point_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, 1, 1 );

		should.equal( p[0], 30 );
		should.equal( p[1], -30 );
		should.equal( p[2], 0 );

		

	});

	it('surface_point', function(){

		// This needs to be tested better
		var degree_u = 3
			, degree_v = 3
			, knot_vector_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knot_vector_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ];

		var p = VERB.eval.nurbs.surface_point( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, 0, 0 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		p = VERB.eval.nurbs.surface_point( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, 1, 1 );

		should.equal( p[0], 30 );
		should.equal( p[1], -30 );
		should.equal( p[2], 0 );

		

	});

	it('surface_point 2', function(){

		var degree_u = 1
			, degree_v = 3
			, knot_vector_u = [0, 0, 1, 1 ]
			, knot_vector_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	] ];

		var p = VERB.eval.nurbs.surface_point( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, 0, 0 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		

	});

	it('surface_derivs_given_n_m', function(){

		var degree_u = 3
			, degree_v = 3
			, u = 0.0
			, v = 0.0
			, knot_vector_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knot_vector_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3
			, num_derivatives = 1;

		var p = VERB.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, 0, 0 );

		// 0th derivative with respect to u & v
		should.equal( p[0][0][0], 0 );
		should.equal( p[0][0][1], 0 );
		should.equal( p[0][0][2], 0 );

		// d/du
		should.equal( p[0][1][0] / p[0][1][0], 1 );
		should.equal( p[0][1][2], 0 );

		// d/dv
		should.equal( p[1][0][0] , 0 );
		should.equal( p[1][0][1] , -30 );
		should.equal( p[1][0][2] , 0 );

		// dd/dudv
		should.equal( p[1][1][0] , 0 );
		should.equal( p[1][1][1] , 0 );
		should.equal( p[1][1][2] , 0 );

		

	});
	
	it('surface_derivs', function(){

		var degree_u = 3
			, degree_v = 3
			, u = 0.0
			, v = 0.0
			, knot_vector_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knot_vector_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3
			, num_derivatives = 1;

		var p = VERB.eval.nurbs.surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, num_derivatives, 0, 0 );

		// 0th derivative with respect to u & v
		should.equal( p[0][0][0], 0 );
		should.equal( p[0][0][1], 0 );
		should.equal( p[0][0][2], 0 );

		// d/du
		should.equal( p[0][1][0] / p[0][1][0], 1 );
		should.equal( p[0][1][2], 0 );

		// d/dv
		should.equal( p[1][0][0] , 0 );
		should.equal( p[1][0][1] , -30 );
		should.equal( p[1][0][2] , 0 );

		// dd/dudv
		should.equal( p[1][1][0] , 0 );
		should.equal( p[1][1][1] , 0 );
		should.equal( p[1][1][2] , 0 );

		

	});

	it('homogenize_1d', function(){

		// 2d
		var weights = [1, 2, 3, 4]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, homo_control_points = VERB.eval.nurbs.homogenize_1d( control_points, weights);

		for (var i = 0; i < control_points.length; i++)
		{
			should.equal( homo_control_points[i][0], weights[i] * control_points[i][0] );
			should.equal( homo_control_points[i][1], weights[i] * control_points[i][1] );
			should.equal( homo_control_points[i][2], weights[i] );
		}

		// 3d
		weights = [1, 2, 3, 4];
		control_points = [ [10, 0, 4], [20, 10, 3], [30, 20, 0], [50, 50, 10] ];
		homo_control_points = VERB.eval.nurbs.homogenize_1d( control_points, weights);

		for (var i = 0; i < control_points.length; i++)
		{
			should.equal( homo_control_points[i][0], weights[i] * control_points[i][0] );
			should.equal( homo_control_points[i][1], weights[i] * control_points[i][1] );
			should.equal( homo_control_points[i][2], weights[i] * control_points[i][2] );
			should.equal( homo_control_points[i][3], weights[i] );
		}

		

	});

	it('homogenize_2d', function(){

		var weights = [ 	[ 1, 	-2, 3, 	5 	],
											[ 2, 	1, 	5, 	2 	],
											[ -3, 4, 	7, 	2 	],
											[ 1, 	6, 	-2, 12 	] ]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, homo_control_points = VERB.eval.nurbs.homogenize_2d( control_points, weights)
			, j = 0;

		for (var i = 0; i < control_points.length; i++)
		{
			for (j = 0; j < control_points[i].length; j++)
			{
				should.equal( homo_control_points[i][j][0], weights[i][j] * control_points[i][j][0] );
				should.equal( homo_control_points[i][j][1], weights[i][j] * control_points[i][j][1] );
				should.equal( homo_control_points[i][j][2], weights[i][j] * control_points[i][j][2] );
				should.equal( homo_control_points[i][j][3], weights[i][j] );
			}
		}

		

	});

	it('dehomogenize', function(){

		var weights = [ 	[ 1, 	-2, 3, 	5 	],
											[ 2, 	1, 	5, 	2 	],
											[ -3, 4, 	7, 	2 	],
											[ 1, 	6, 	-2, 12 	] ]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, homo_control_points = VERB.eval.nurbs.homogenize_2d( control_points, weights)
			, j = 0
			, dehomo_pt = [];

		for (var i = 0; i < control_points.length; i++)
		{
			for (j = 0; j < control_points[i].length; j++)
			{
				dehomo_pt = VERB.eval.nurbs.dehomogenize( homo_control_points[i][j] );
				should.equal( dehomo_pt.length, control_points[i][j].length );
				should.equal( dehomo_pt[0], control_points[i][j][0] );
				should.equal( dehomo_pt[1], control_points[i][j][1] );
				should.equal( dehomo_pt[2], control_points[i][j][2] );
			}
		}

		

	});

	it('rational_curve_point', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, knot_vector = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0], [1,1], [0,1] ];

		var p = VERB.eval.nurbs.rational_curve_point( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights) , 0);

		should.equal( p[0], 1 );
		should.equal( p[1], 0 );

		p = VERB.eval.nurbs.rational_curve_point( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights) , 0.5);

		should.equal( p[0], 0.6 );
		should.equal( p[1], 0.8 );

		p = VERB.eval.nurbs.rational_curve_point( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights) , 1);

		should.equal( p[0], 0 );
		should.equal( p[1], 1 );

		

	});

	it('rational_surface_point', function(){

		// quarter cylinder patch
		var degree_u = 1
			, degree_v = 2
			, knot_vector_u = [0, 0, 1, 1 ]
			, knot_vector_v = [0, 0, 0, 1, 1, 1 ]
			, homo_control_points = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
													 		  [ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ];

		var p = VERB.eval.nurbs.rational_surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, 0, 0 );

		should.equal( p[0], 1 );
		should.equal( p[1], 1 );
		should.equal( p[2], 0 );

		p = VERB.eval.nurbs.rational_surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, 0.5, 0.5 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0.6 );
		should.equal( p[2], 0.8 );

		p = VERB.eval.nurbs.rational_surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, 1, 1 );

		should.equal( p[0], -1 );
		should.equal( p[1], 0 );
		should.equal( p[2], 1 );

	});

	it('separate_homo_derivs_1d', function(){

		var CK = [ [1, 1, 0, 1], [1, 1, 1, 1], [2, 0, 2, 2] ]
			, ders = VERB.eval.nurbs.separate_homo_derivs_1d( CK )
			, Aders = ders[0]
			, wders = ders[1];

		should.equal( Aders.length, wders.length );
		should.equal( CK.length, wders.length );

		for (var i = 0, l = Aders.length; i < l; i++)
		{
			should.equal( Aders[i].length, 3);
			should.equal( CK[i][0], Aders[i][0] );
			should.equal( CK[i][1], Aders[i][1] );
			should.equal( CK[i][2], Aders[i][2] );
			should.equal( CK[i][3], wders[i] );

		}

		

	});

	it('separate_homo_derivs_2d', function(){

		var SKL = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
								[ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
			, ders = VERB.eval.nurbs.separate_homo_derivs_2d( SKL )
			, Aders = ders[0]
			, wders = ders[1];
		
		should.equal( Aders.length, wders.length );
		should.equal( SKL.length, wders.length );

		for (var i = 0, rows = SKL.length, j = 0, cols = 0; i < rows; i++) {
			should.equal( Aders[i].length, wders[i].length );
			should.equal( wders[i].length, SKL[i].length );

			for (j = 0, cols = SKL[i].length; j < cols ; j++) {
				should.equal( Aders[i][j].length, 3);
				should.equal( SKL[i][j][0], Aders[i][j][0] );
				should.equal( SKL[i][j][1], Aders[i][j][1] );
				should.equal( SKL[i][j][2], Aders[i][j][2] );
				should.equal( SKL[i][j][3], wders[i][j] );
			}
		}

		

	});

	it('rational_curve_derivs', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, knot_vector = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0], [1,1], [0,1] ];

		var p = VERB.eval.nurbs.rational_curve_derivs( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), 0, 2);

		should.equal( p[0][0], 1 );
		should.equal( p[0][1], 0 );

		should.equal( p[1][0], 0 );
		should.equal( p[1][1], 2 );

		should.equal( p[2][0], -4 );
		should.equal( p[2][1], 0 );

		p = VERB.eval.nurbs.rational_curve_derivs( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), 1, 2);

		should.equal( p[0][0], 0 );
		should.equal( p[0][1], 1 );

		should.equal( p[1][0], -1 );
		should.equal( p[1][1], 0 );

		// TODO: need additional checks here
		should.equal( p[2][0], 1 );
		should.equal( p[2][1], -1 );

		

	});

	it('rational_surface_derivs', function(){

		// quarter cylinder patch, axis aligned with x axis, radius: 1
		var degree_u = 1
			, degree_v = 2
			, knot_vector_u = [0, 0, 1, 1 ]
			, knot_vector_v = [0, 0, 0, 1, 1, 1 ]
			, homo_control_points = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
													 		  [ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
			, num_derivatives = 1;

		var p = VERB.eval.nurbs.rational_surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivatives, 0, 0);

		should.equal( p[0][0][0], 1 );
		should.equal( p[0][0][1], 1 );
		should.equal( p[0][0][2], 0 );

		should.equal( p[0][1][0], 0 );
		should.equal( p[0][1][1], 0 );
		should.equal( p[0][1][2], 2 );

		should.equal( p[1][0][0], -2 );
		should.equal( p[1][0][1], 0 );
		should.equal( p[1][0][2], 0 );

		p = VERB.eval.nurbs.rational_surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivatives, 1, 1);

		should.equal( p[0][0][0], -1 );
		should.equal( p[0][0][1], 0 );
		should.equal( p[0][0][2], 1 );

		should.equal( p[0][1][0], 0 );
		should.equal( p[0][1][1], -1 );
		should.equal( p[0][1][2], 0 );

		should.equal( p[1][0][0], -2 );
		should.equal( p[1][0][1], 0 );
		should.equal( p[1][0][2], 0 );

	});

	it('curve_knot_insert', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, u = 0.5
			, knot_vector = [0, 0, 0, 1, 1, 1 ]
			, control_points = [ [1, 0], [1,1], [0,1] ];

		var p = VERB.eval.nurbs.curve_knot_insert( degree, knot_vector, control_points, u, 0, 1 );
		// should.equal(0, 1);

	});

	it('three_points_are_flat should identify flat line by returning true', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var p1 = [0,0,0],
			p2 = [0,2,0],
			p3 = [0,4,0];

		should.equal(true, VERB.eval.nurbs.three_points_are_flat(p1,p2,p3,1e-5));

	});

	it('rational_curve_point can make a line', function(){

		var degree = 1
			, knot_vector = [0, 0, 1, 1]
			, control_points = [ [0, 0, 0], [10, 0, 0] ]
			, weights = [1, 1]
			, u1 = 0.0
			, u2 = 0.5
			, u3 = 1.0;

		var p1 = VERB.eval.nurbs.rational_curve_point( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), u1);
		var p2 = VERB.eval.nurbs.rational_curve_point( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), u2);
		var p3 = VERB.eval.nurbs.rational_curve_point( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), u3);
		
		should.equal(p1[0], 0);
		should.equal(p2[0], 5);
		should.equal(p3[0], 10);

	});

	it('rational_curve_adaptive_sample returns two end points for a line', function(){

		var degree = 1
			, knot_vector = [0, 0, 1, 1]
			, control_points = [ [0, 0, 0], [10, 0, 0] ]
			, weights = [1, 1];

		var p = VERB.eval.nurbs.rational_curve_adaptive_sample( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), 1e-5);	
		
		should.equal(p[0][0], 0);
		should.equal(p[1][0], 1);

	});


	it('rational_curve_adaptive_sample makes more points for an arc', function(){

		var degree = 2
			, knot_vector = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0, 0], [1, 1, 0], [0, 1, 0] ];

		var p = VERB.eval.nurbs.rational_curve_adaptive_sample( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), 1e-8);	
		var p2 = VERB.eval.nurbs.rational_curve_adaptive_sample( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), 1e-4);	
		
		var prev = - 1e-8;
		for (var i = 0; i < p.length; i++){
			p[i][0].should.be.above(prev);
			p[i][0].should.be.within(-1e-8,1 + 1e-8);
			prev = p[i][0];
		}

		should.notEqual(p.length, 0);
		should.notEqual(p2.length, 0);
		should.notEqual(p.length, p2.length);

		should.equal(p[p.length-1][0], 1.0);
		should.equal(p2[p2.length-1][0], 1.0);

	});

	it('rational_curve_regular_sample should return 10 samples when asked to', function(){

		var degree = 2
			, knot_vector = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0, 0], [1, 1, 0], [0, 1, 0] ]
			, numSamples = 10;

		var p = VERB.eval.nurbs.rational_curve_regular_sample( degree, knot_vector, VERB.eval.nurbs.homogenize_1d( control_points, weights), numSamples);	

		should.equal(p.length, 10);
		should.equal(p[0][0], 0);

	});
			
});

describe("VERB.eval.mesh.",function(){

	it('get_tri_centroid should return origin for zeroed triangle', function(){

		var points = [[0,0,0],[0,0,0],[0,0,0]]
			, tri = [0,1,2]
			, centroid = VERB.eval.geom.get_tri_centroid( points, tri );

		should.equal( 0, centroid[0] );
		should.equal( 0, centroid[1] );
		should.equal( 0, centroid[2] );

	});

	it('get_tri_centroid should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, centroid = VERB.eval.geom.get_tri_centroid( points, tri );

		should.equal( -2/3, centroid[0] );
		should.equal( 1, centroid[1] );
		should.equal( 17/3, centroid[2] );

	});

	it('get_min_coordinate_on_axis should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, a1 = VERB.eval.mesh.get_min_coordinate_on_axis( points, tri, 0 )
			, a2 = VERB.eval.mesh.get_min_coordinate_on_axis( points, tri, 1 )
			, a3 = VERB.eval.mesh.get_min_coordinate_on_axis( points, tri, 2 );

		should.equal( -10, a1 );
		should.equal( -4, a2 );
		should.equal( 2, a3 );

	});

	it('sort_tris_on_longest_axis should return correct result with y axis regular array', function(){

		//
		//  0  -  1
		//  | 0 / 3 \ 
		//  2   --  3
		//  | 1 \ 2 /
		//  4  -  5
		// 

		var points = [ [0,0,0], [1,-0.2,0], [0, -1, 0 ], [1, -1.2, 0], [0, -2, 0], [1, -2.2, 0]]
			, tris = [[0,2,1], [2,4,5], [2,5,3], [1,2,3]]
			, tri_indices = [0,1,2,3]
			, aabb = VERB.eval.mesh.make_mesh_aabb(points, tris, tri_indices)
			, sort_tri_indices = VERB.eval.mesh.sort_tris_on_longest_axis( aabb, points, tris, tri_indices );

		should.equal( 2, sort_tri_indices[0] );
		should.equal( 1, sort_tri_indices[1] );
		should.equal( 3, sort_tri_indices[2] );
		should.equal( 0, sort_tri_indices[3] );

	});

	it('sort_tris_on_longest_axis should return correct result', function(){

		// 0 \
		// 1 \\     0
		//     4    2
		// 2 //     1
		// 3 /      

		var points = [ [0,10,0], [0,5,0], [0, 0, 0 ], [0, -5, 0], [0, -2, 0], [1, -2.2, 0]]
			, tris = [[0,1,4], [2,3,4], [1,2,4]]
			, tri_indices = [0,1,2]
			, aabb = VERB.eval.mesh.make_mesh_aabb(points, tris, tri_indices)
			, sort_tri_indices = VERB.eval.mesh.sort_tris_on_longest_axis( aabb, points, tris, tri_indices );

		should.equal( 1, sort_tri_indices[0] );
		should.equal( 2, sort_tri_indices[1] );
		should.equal( 0, sort_tri_indices[2] );

	});

	it('make_mesh_aabb should return correct result for planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices = [0,1,2,3]
			, aabb = VERB.eval.mesh.make_mesh_aabb(points, tris, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );		
		should.equal( 0, aabb.max[2] );
		should.equal( 0, aabb.min[2] );

	});

	it('make_mesh_aabb should return correct result for non-planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points = [ [0,0,-5], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 4] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices = [0,1,2,3]
			, aabb = VERB.eval.mesh.make_mesh_aabb(points, tris, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );		
		should.equal( 4, aabb.max[2] );
		should.equal( -5, aabb.min[2] );

	});

	it('make_mesh_aabb_tree should have the correct structure', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices = [0,1,2,3]
			, root = VERB.eval.mesh.make_mesh_aabb_tree( points, tris, tri_indices );

		// root bb is correct
		should.equal( 2, root.bounding_box.max[0] );
		should.equal( 0, root.bounding_box.min[0] );
		should.equal( 0, root.bounding_box.max[1] );
		should.equal( -2, root.bounding_box.min[1] );		
		should.equal( 0, root.bounding_box.max[2] );
		should.equal( 0, root.bounding_box.min[2] );

		// root is not a leaf
		should.equal( 2, root.children.length);

		// children should have 2 children, too
		var child1 = root.children[0],
			child2 = root.children[1];

		should.equal( 2, child1.children.length );
		should.equal( 2, child2.children.length );

		// the children's children should be leaves
		var child1child1 = child1.children[0],
			child1child2 = child1.children[1],
			child2child1 = child2.children[0],
			child2child2 = child2.children[1];

		should.equal( 0, child1child1.children.length );
		should.equal( 0, child1child2.children.length );

		should.equal( 0, child2child1.children.length );
		should.equal( 0, child2child2.children.length );

		// the grandchildren have the correct triangles in them
		should.equal( 2, child1child1.triangle );
		should.equal( 3, child1child2.triangle );

		should.equal( 0, child2child1.triangle );
		should.equal( 1, child2child2.triangle );

	});


	it('intersect_aabb_trees should have the correct result', function(){

		//
		//  0  - 1
		//  |  /  \   
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points1 = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris1 = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices1 = [0,1,2,3]
			, aabb1 = VERB.eval.mesh.make_mesh_aabb_tree( points1, tris1, tri_indices1 )

			, points2 = [ [0.5,-2,0.5], [0.5,-2,-1], [1,0.5,-1 ] ]
			, tris2 = [ [0,1,2] ]
			, tri_indices2 = [0]
			, aabb2 = VERB.eval.mesh.make_mesh_aabb_tree( points2, tris2, tri_indices2 )
			, inter_result = VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb1, aabb2 );

		// find all 4 triangle intersections
		should.equal( 4, inter_result.length );

		// find the specific intersections
		should.equal( 2, inter_result[0][0] );
		should.equal( 0, inter_result[0][1] );

		should.equal( 3, inter_result[1][0] );
		should.equal( 0, inter_result[1][1] );

		should.equal( 0, inter_result[2][0] );
		should.equal( 0, inter_result[2][1] );

		should.equal( 1, inter_result[3][0] );
		should.equal( 0, inter_result[3][1] );

	});

});

describe("BoundingBox",function(){

	it('init() should allow point arguments', function(){

		var bb1 = new VERB.geom.BoundingBox( [5,5,5], [10,10,10]);

		should.equal( bb1.min[0], 5 );
		should.equal( bb1.min[1], 5 );
		should.equal( bb1.min[2], 5 );

		should.equal( bb1.max[0], 10 );
		should.equal( bb1.max[1], 10 );
		should.equal( bb1.max[2], 10 );
	
	});

	it('BoundingBox.intersects', function(){

		var bb1 = new VERB.geom.BoundingBox( [5,5,5], [10,10,10])
			, bb2 = new VERB.geom.BoundingBox( [0,0,0], [10,10,10])
			, bb3 = new VERB.geom.BoundingBox( [-2,-2,-2], [-1,-1,-1] );

		should.equal( bb1.intersects(bb2), true );
		should.equal( bb1.intersects(bb3), false );
		should.equal( bb2.intersects(bb3), false );		

	});

	it('BoundingBox.intersect', function(){

		// initialize a bounding box
		var bb1 = new VERB.geom.BoundingBox( [5,5,5], [10,10,10])
			, bb2 = new VERB.geom.BoundingBox( [0,0,0], [10,10,10])
			, bb3 = new VERB.geom.BoundingBox( [-2,-2,-2], [-1,-1,-1] );

		// intersect bounding boxes
		var int_bb1_bb2 = bb1.intersect(bb2)
			, int_bb1_bb3 = bb1.intersect(bb3);

		should.equal( int_bb1_bb2.min[0], 5 );
		should.equal( int_bb1_bb2.min[1], 5 );
		should.equal( int_bb1_bb2.min[2], 5 );

		should.equal( int_bb1_bb2.max[0], 10 );
		should.equal( int_bb1_bb2.max[1], 10 );
		should.equal( int_bb1_bb2.max[2], 10 );

		should.equal( int_bb1_bb3, null ); //non-intersect is null

	
	});

	it('BoundingBox.intervals_overlap', function(){

		should.equal( VERB.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 0, 10 ), true );
		should.equal( VERB.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 1, 10 ), true );
		should.equal( VERB.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 1+1e-3, 10 ), false );
		should.equal( VERB.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 2, 10 ), false );

	});

	it('BoundingBox.contains', function(){

		var bb4 = new VERB.geom.BoundingBox( [0,0,0], [1,1,1] )
			, bb5 = new VERB.geom.BoundingBox();

		should.equal( bb4.contains( [0,0,0] ), true );
		should.equal( bb4.contains( [1,1,1] ), true );
		should.equal( bb4.contains( [1,1,1+1e-3] ), false );
		should.equal( bb4.contains( [1,1,1-1e-3] ), true );
		should.equal( bb5.contains( [0,0,0] ), false );

	});

	it('BoundingBox.clear', function(){

		var bb1 = new VERB.geom.BoundingBox( [5,5,5], [10,10,10] );
		bb1.clear();
		should.equal( bb1.initialized, false );

	});

	it('.get_axis_length() should return correct value', function(){

		var bb1 = new VERB.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_axis_length(0), 11 );
		should.equal( bb1.get_axis_length(1), 8 );
		should.equal( bb1.get_axis_length(2), 7 );

	});

	it('.get_longest_axis() should return correct value', function(){

		var bb1 = new VERB.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_longest_axis(0), 0 );

	});

	it('.get_axis_length() should return 0 when given out of bounds index', function(){

		var bb1 = new VERB.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_axis_length(8), 0 );
		should.equal( bb1.get_axis_length(-1), 0 );
		should.equal( bb1.get_axis_length(4), 0 );
		should.equal( bb1.get_axis_length(3), 0 );

	});


	it('.get_axis_length() should return 0 when given out of bounds index', function(){

		var bb1 = new VERB.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_axis_length(8), 0 );
		should.equal( bb1.get_axis_length(-1), 0 );
		should.equal( bb1.get_axis_length(4), 0 );
		should.equal( bb1.get_axis_length(3), 0 );

	});

	it('.clear() should set initialized to false', function(){

		var bb1 = new VERB.geom.BoundingBox( [5,5,5], [10,10,10] );
		bb1.clear();
		should.equal( bb1.initialized, false );

	});

});


describe("VERB.eval.nurbs.closest_point_on_line",function(){

	it('returns correct result for xaxis and 3d pt', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/2;

		var arc_components = VERB.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = VERB.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, VERB.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < VERB.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < VERB.EPSILON, true );
		should.equal( p[2], 0 );

	});

});

describe("VERB.eval.nurbs.get_arc",function(){

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/2;

		var arc_components = VERB.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = VERB.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, VERB.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < VERB.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < VERB.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit arc from 0 to 45 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/4;

		var arc_components = VERB.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = VERB.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, VERB.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 1);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < VERB.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < VERB.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit arc from 45 to 135 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = Math.PI/4
			, end = 3*Math.PI/4;

		var arc_components = VERB.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = VERB.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, VERB.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] ) < VERB.EPSILON, true );
		should.equal( Math.abs( p[1] - 1 ) < VERB.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit circle', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI * 2;

		var arc_components = VERB.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = VERB.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, VERB.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] + 1) < VERB.EPSILON, true );
		should.equal( Math.abs( p[1] ) < VERB.EPSILON, true );
		should.equal( p[2], 0 );

	});

});




// describe("VERB.eval.geom.get_tri_norm",function(){

// 	it('returns correct result for arc from 0 to 45 deg', function(){

// 		var a = [0,0,0]
// 			, b = [1,0,0]
// 			, c = [0,1,0]
// 			, r = 1
// 			, start = 0
// 			, end = Math.PI/4;

// 		should.equal( 4, VERB.eval.nurbs.get_arc(center, x, y, 1, start, end) );

// 	});

// });

// describe("VERB.eval.geom.intersect_tris",function(){

// 	it('returns correct result for arc from 0 to 45 deg', function(){

// 		var center = [0,0,0]
// 			, x = [1,0,0]
// 			, y = [0,1,0]
// 			, r = 1
// 			, start = 0
// 			, end = Math.PI/4;

// 		should.equal( 4, VERB.eval.nurbs.get_arc(center, x, y, 1, start, end) );

// 	});

// });

// test me:

// get_tri_norm
// aabb methods
// knot insert