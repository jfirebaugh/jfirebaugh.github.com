var rates = {
  "Civic Center": {
    "Franklin St 100": [0.2586, 0.4844, 0.6627, 0.7911, 0.7433, 0.5588],
    "Franklin St 200": [0.5606, 0.6364, 0.6153, 0.5795, 0.7949, 0.6832],
    "Franklin St 300": [0.2640, 0.5554, 0.5267, 0.2342, 0.3787, 0.4019],
    "Franklin St 400": [0.4716, 0.7365, 0.8385, 0.3567, 0.6581, 0.6667],
    "Franklin St 500": [0.4432, 0.5632, 0.6324, 0.2896, 0.3077, 0.3492],
    "Golden Gate 0": [0.7440, 0.7647, 0.6762, 0.6256, 0.6261, 0.5586],
    "Golden Gate Ave 700": [0.5431, 0.7553, 0.7233, 0.3195, 0.4434, 0.5017],
    "Gough St 200": [0.3714, 0.4845, 0.8082, 0.5066, 0.6467, 0.5638],
    "Gough St 300": [0.6395, 0.8132, 0.8536, 0.8132, 0.9268, 0.9035],
    "Gough St 400": [0.7136, 0.8206, 0.7580, 0.6811, 0.8806, 0.8247],
    "Grove St 0": [0.6677, 0.7988, 0.7764, 0.5583, 0.7222, 0.6909],
    "Grove St 100": [0.6052, 0.7876, 0.7086, 0.1655, 0.3421, 0.4210],
    "Hayes St 0": [0.4467, 0.5612, 0.3836, 0.1145, 0.3965, 0.4813],
    "Hayes St 100": [0.2060, 0.3606, 0.1869, 0.1320, 0.2195, 0.2304],
    "Hayes St 200": [0.2144, 0.4429, 0.2267, 0.0682, 0.3766, 0.4107],
    "Hayes St 300": [0.6897, 0.8547, 0.8388, 0.6031, 0.8912, 0.8783],
    "Hayes St 400": [0.7657, 0.8758, 0.8716, 0.9122, 0.9253, 0.8740],
    "Hayes St 500": [0.8129, 0.9046, 0.8767, 0.8924, 0.8906, 0.8684],
    "Hickory St 0": [0.7571, 0.8278, 0.7643, 0.6802, 0.7746, 0.6493],
    "Hickory St 100": [0.5669, 0.5384, 0.8022, 0.6806, 0.7410, 0.6485],
    "Larkin St 100": [0.6501, 0.8051, 0.7610, 0.6099, 0.8242, 0.8255],
    "Larkin St Ave 200": [0.8377, 0.8623, 0.8265, 0.7515, 0.7562, 0.8166],
    "Larkin St St 0": [0.5075, 0.7449, 0.6818, 0.4669, 0.6463, 0.6333],
    "Lech Walesa 0": [0.8596, 0.8533, 0.6973, 0.6000, 0.7837, 0.6513],
    "Mcallister St 300": [0.8302, 0.8751, 0.8021, 0.6109, 0.7060, 0.7096],
    "Mcallister St Ave 400": [0.6353, 0.7035, 0, 0.3306, 0.4996, 0.4660],
    "Mcallister St Ave 500": [0.3409, 0.4731, 0.6442, 0.2260, 0.3465, 0.3201],
    "Oak St 0": [0.6838, 0.8921, 0.8798, 0.7197, 0.8449, 0.7137],
    "Oak St 100": [0.5358, 0.6423, 0.7889, 0.7492, 0.7235, 0.5743],
    "Polk St 100": [0.6395, 0.7345, 0.6585, 0.2897, 0.4250, 0.5019],
    "Polk St Ave 0": [0.6714, 0.7692, 0.7921, 0.8941, 0.7196, 0.7871],
    "Polk St Ave 300": [0.9349, 0.9439, 0.7917, 0.6430, 0.8416, 0.6832],
    "Redwood St Ave 100": [0.7909, 0.8453, 0.7245, 0.1857, 0.3117, 0.3530],
    "Van Ness 100": [0.6662, 0.8671, 0.7663, 0.4862, 0.6295, 0.4525],
    "Van Ness 200": [0.4995, 0.6741, 0.6335, 0.2814, 0.3050, 0.2418],
    "Van Ness 300": [0.3339, 0.4140, 0.3304, 0.2033, 0.2391, 0.2196],
    "Van Ness 400": [0.3769, 0.5137, 0.4933, 0.0731, 0.2709, 0.2567],
    "Van Ness 500": [0.4812, 0.6322, 0.6766, 0.2771, 0.4062, 0.4687],
    "Van Ness Ave 600": [0.5930, 0.6613, 0.5643, 0.2908, 0.3652, 0.3913]
  },
  "Downtown": {
    "1st St 200": [0.5645, 0.6322, 0.6499, 0.3259, 0.3577, 0.2909],
    "2nd St 200": [0.7524, 0.9118, 0.8528, 0.5270, 0.5056, 0.5820],
    "Battery St 400": [0.8745, 0.9609, 0.8962, 0.2886, 0.3376, 0.2929],
    "Battery St 500": [0.6412, 0.9115, 0.8527, 0.3195, 0.4053, 0.7123],
    "Clay St 100": [0.7882, 0.8795, 0.8523, 0.7330, 0.7920, 0.6379],
    "Clay St 200": [0.6352, 0.5729, 0.6164, 0.5100, 0.5914, 0.7632],
    "Clay St 300": [0.8934, 0.9079, 0.8885, 0.4484, 0.8910, 0.8500],
    "Clay St 400": [0.8980, 0.9023, 0.9362, 0.7608, 0.7728, 0.8537],
    "Clay St 500": [0.5907, 0, 0, 0.4708, 0.4382, 0.6818],
    "Davis St 300": [0.4988, 0.7391, 0, 0.4533, 0.9277, 0.6078],
    "Drumm St 200": [0.9580, 0.9750, 0.9572, 0.8700, 0.9715, 0.9112],
    "Drumm St 300": [0.8072, 0.9433, 0.9580, 0.9639, 0.9535, 0.8791],
    "Jackson St 0": [0.7600, 0.9399, 0.9387, 0.9751, 0.9566, 0.8013],
    "Jackson St 100": [0.8118, 0.8708, 0.8428, 0.7935, 0.8457, 0.7858],
    "Jackson St 200": [0.7886, 0.9185, 0.8551, 0.3095, 0.7039, 0.7551],
    "Jackson St 300": [0.7155, 0.8230, 0.7161, 0.4620, 0.4560, 0.2704],
    "Jackson St 400": [0.7482, 0.9691, 0.9330, 0.4179, 0.7429, 0.7223],
    "Market St 0": [0.9188, 0.9119, 0.9211, 0.9734, 0.9958, 0.9207],
    "Merchant St 400": [0.8248, 0.9176, 0.6438, 0.2584, 0.2558, 0.4096],
    "Mission St 0": [0.8137, 0.8569, 0.8821, 0.7498, 0.8080, 0.8374],
    "Mission St 600": [0.6817, 0.7578, 0, 0.6339, 0.8193, 0.8046],
    "Montgomery St 1000": [0.7705, 0.9156, 0.8903, 0.4355, 0.7567, 0.7280],
    "Montgomery St 600": [0, 0, 0, 0.1442, 0.3105, 0.3852],
    "Natoma St 100": [0.1718, 0.2103, 0.4672, 0.2906, 0.3798, 0.4579],
    "Sansome St 500": [0.7733, 0.7892, 0, 0.2841, 0.2553, 0.2272],
    "Sansome St 700": [0.7175, 0.7878, 0.6873, 0.0357, 0.1914, 0.1786],
    "Steuart St 0": [0.9618, 0.9605, 0.9455, 0.7867, 0.7771, 0.7278],
    "Steuart St 100": [0.6309, 0.7983, 0.7192, 0.6219, 0.7535, 0.5602],
    "Tehama St 100": [0.8006, 0.8195, 0.7908, 0.6932, 0.5714, 0.7811],
    "Washington St 100": [0.6871, 0.8832, 0.8896, 0.8663, 0.9483, 0.9338],
    "Washington St 200": [0.8321, 0.8899, 0.8803, 0.8973, 0.8779, 0.7583],
    "Washington St 300": [0.8887, 0.9512, 0.9174, 0.5961, 0.7647, 0.6507],
    "Washington St 400": [0.7577, 0.8717, 0.8441, 0.4242, 0.6725, 0.4783],
    "Washington St 500": [0.7668, 0.8942, 0.8682, 0.2116, 0.2086, 0.1778],
    "Washington St 600": [0.7634, 0.7909, 0.8345, 0.3610, 0.6253, 0.5754]
  },
  "Fillmore": {
    "Buchanan St 1800": [0.7362, 0.8327, 0.8264, 0.8203, 0.8908, 0.9312],
    "California St 2300": [0.8594, 0.8635, 0.8437, 0.7871, 0.8935, 0.8817],
    "California St 2400": [0.7414, 0.8417, 0.8130, 0.8057, 0.9362, 0.8274],
    "Clay St 2400": [0.9732, 0.9635, 0.9595, 0.9019, 0.9654, 0.9609],
    "Clay St 2500": [0.9906, 0.9746, 0.9116, 0.9624, 0.9674, 0.9536],
    "Fillmore St 1100": [0.4752, 0.5912, 0.6191, 0.4735, 0.5246, 0.5753],
    "Fillmore St 1200": [0.5961, 0.6692, 0.6694, 0.5612, 0.6076, 0.4777],
    "Fillmore St 1300": [0.6889, 0.6557, 0.6106, 0.7809, 0.7093, 0.6693],
    "Fillmore St 1400": [0.5523, 0.6513, 0.7033, 0.5012, 0.6113, 0.7155],
    "Fillmore St 1500": [0.6522, 0.7337, 0.7200, 0.6609, 0.7489, 0.7360],
    "Fillmore St 1500": [0.6210, 0.6830, 0.6345, 0.7001, 0.7005, 0.7821],
    "Fillmore St 1600": [0.6724, 0.7376, 0.7484, 0.6580, 0.7778, 0.8192],
    "Fillmore St 1700": [0.5626, 0.6804, 0.6170, 0.3510, 0.7386, 0.7635],
    "Fillmore St 1800": [0.7319, 0.8345, 0.7732, 0.7234, 0.7575, 0.7722],
    "Fillmore St 1900": [0.8095, 0.7972, 0.7881, 0.7479, 0.8577, 0.8504],
    "Fillmore St 2000": [0.7961, 0.8226, 0.8319, 0.7903, 0.9009, 0.8371],
    "Fillmore St 2100": [0.8780, 0.9032, 0.8806, 0.8266, 0.8940, 0.8807],
    "Fillmore St 2200": [0.9389, 0.9094, 0.9133, 0.8643, 0.8697, 0.8981],
    "Fillmore St 2300": [0.8310, 0.8138, 0.8184, 0.6579, 0.8874, 0.8186],
    "Fillmore St 2400": [0.8037, 0.8665, 0.8286, 0.7185, 0.8701, 0.8714],
    "Geary Blvd 1500": [0.5591, 0.7501, 0.5931, 0.6478, 0.8963, 0.9205],
    "Geary Blvd 1600": [0.6842, 0.7851, 0.7661, 0.7380, 0.8729, 0.8819],
    "Geary Blvd 1700": [0.6300, 0.7302, 0.6707, 0.6097, 0.7906, 0.8567],
    "Geary Blvd 1800": [0.6266, 0.6034, 0.4523, 0.7615, 0.6377, 0.6850],
    "Jackson St 2300": [0.7669, 0.7187, 0.6656, 0.6349, 0.6650, 0.7270],
    "Jackson St 2400": [0.6034, 0.5217, 0.6298, 0.5680, 0.7630, 0.7523],
    "Laguna St 1500": [0.6291, 0.7314, 0.5076, 0.7463, 0.8339, 0.8595],
    "Laguna St 1600": [0.4392, 0.6873, 0.6664, 0.6247, 0.8964, 0.8268],
    "Pine St 2400": [0.9026, 0.8146, 0.8016, 0.9484, 0.8348, 0.8562],
    "Post St 1600": [0.7742, 0.9078, 0.8749, 0.7945, 0.9553, 0.9515],
    "Post St 1800": [0.7804, 0.9217, 0.9017, 0.8418, 0.9727, 0.9651],
    "Post St 1800": [0.5256, 0.7790, 0.7668, 0.6044, 0.9079, 0.8753],
    "Post St 2000": [0.7152, 0.7506, 0.6480, 0.6357, 0.8808, 0.8867],
    "Sacramento St 2400": [0.7255, 0.7945, 0.7497, 0.7191, 0.8029, 0.7785],
    "Sacramento St 2500": [0.4403, 0.4422, 0.4980, 0.7585, 0.7846, 0.7310],
    "Steiner St 1500": [0.6869, 0.6417, 0.5726, 0.6843, 0.7835, 0.8080],
    "Sutter St 1900": [0.8491, 0.9139, 0.8062, 0.8563, 0.9334, 0.8663],
    "Sutter St 2100": [0.7046, 0.7144, 0.6553, 0.6516, 0.7996, 0.7946],
    "Washington St 1200": [0.8325, 0.9210, 0.9321, 0.8302, 0.9822, 0.9424],
    "Washington St 2500": [0.8207, 0.8313, 0.8167, 0.7885, 0.8801, 0.8128],
    "Webster St 1600": [0.3849, 0.6250, 0.6176, 0.3676, 0.7623, 0.7237],
    "Webster St 1700": [0.8736, 0.8985, 0.9081, 0.8551, 0.9839, 0.9809],
    "Webster St 2200": [0.9473, 0.9614, 0.8958, 0.9005, 0.9165, 0.9261],
    "Webster St 2300": [0.9117, 0.8754, 0.8961, 0.6472, 0.8088, 0.7839]
  },
  "Fisherman's Wharf": {
    "Bay St 300": [0.4412, 0.4799, 0.4620, 0.4453, 0.5095, 0.4812],
    "Bay St 400": [0.4268, 0.4256, 0.4631, 0.4037, 0.4688, 0.4866],
    "Bay St 500": [0.2859, 0.2814, 0.2279, 0.3371, 0.5100, 0.8104],
    "Beach St 2300": [0.6688, 0.7587, 0.7588, 0.6384, 0.7420, 0.6746],
    "Beach St 700": [0.2665, 0.7806, 0.6864, 0.4594, 0.9255, 0.9075],
    "Beach St 800": [0.5344, 0.8542, 0.7984, 0.7148, 0.9735, 0.9605],
    "Beach St St 300": [0.4300, 0.7630, 0.6756, 0.5829, 0.8331, 0.8068],
    "Beach St St 400": [0.2708, 0.4740, 0.4522, 0.2919, 0.6915, 0.7412],
    "Beach St St 500": [0.4818, 0.7857, 0.6947, 0.4477, 0.8430, 0.8982],
    "Beach St St 900": [0.5285, 0.8446, 0.7416, 0.5083, 0.7997, 0.7822],
    "Columbus Ave 1300": [0.3091, 0.3313, 0.2773, 0.3520, 0.5279, 0.7385],
    "Columbus Ave 200": [0.4129, 0.6436, 0.5843, 0.4883, 0.8316, 0.8325],
    "Hyde St 2800": [0.6152, 0.8394, 0.8229, 0.6967, 0.9729, 0.9557],
    "Larkin St 3100": [0.2862, 0.6535, 0.6804, 0.3405, 0.7146, 0.7277],
    "Leavenworth St 2700": [0.3615, 0.6675, 0.5923, 0.4141, 0.8648, 0.8338],
    "Leavenworth St 300": [0.4204, 0.6437, 0.5679, 0.2442, 0.7509, 0.8197],
    "Mason St 2300": [0.4435, 0.5025, 0.5223, 0.2867, 0.4610, 0.5491],
    "Mason St 2400": [0.5480, 0.6009, 0.5688, 0.5105, 0.6168, 0.6531],
    "Mason St 2500": [0.4158, 0.8031, 0.6842, 0.3803, 0.8343, 0.9397],
    "Mason St 2600": [0.4866, 0.8300, 0.8080, 0.5284, 0.9399, 0.9263],
    "North Point 0": [0.4323, 0.6496, 0.5862, 0.4593, 0.8052, 0.8222],
    "North Point 3000": [0.4148, 0.5676, 0.4866, 0.5755, 0.7498, 0.7896],
    "North Point 500": [0.3358, 0.3443, 0.4022, 0.3145, 0.6383, 0.7634],
    "North Point 600": [0.4941, 0.5239, 0.5599, 0.5111, 0.7320, 0.7941],
    "Polk St 400": [0.4165, 0.7026, 0.5659, 0.2344, 0.7610, 0.8480],
    "Powell St 2400": [0.3625, 0.4191, 0.4375, 0.2958, 0.1750, 0.2915],
    "Powell St 2500": [0.4490, 0.5305, 0.5066, 0.3509, 0.6118, 0.6792],
    "Taylor St 2600": [0.3855, 0.5243, 0.4605, 0.4668, 0.8152, 0.8034],
    "Taylor St 2700": [0.3571, 0.5649, 0.5277, 0.3429, 0.7807, 0.8420],
    "Taylor St 2800": [0.4203, 0.7820, 0.7342, 0.4368, 0.8842, 0.8291]
  },
  "Marina": {
    "Avila St 0": [0.7026, 0.8407, 0.8319, 0.7814, 0.9323, 0.8496],
    "Chestnut St 2000": [0.7854, 0.8490, 0.8449, 0.8159, 0.8562, 0.8943],
    "Chestnut St 2100": [0.8288, 0.8676, 0.8405, 0.8360, 0.9094, 0.9251],
    "Chestnut St 2200": [0.8353, 0.8609, 0.8596, 0.8425, 0.8769, 0.8868],
    "Chestnut St 2300": [0.7848, 0.8206, 0.8118, 0.7922, 0.8598, 0.8666],
    "Chestnut St 2400": [0.7250, 0.7666, 0.8429, 0.7596, 0.8021, 0.8789],
    "Divisadero St 3200": [0.5666, 0.7442, 0.7717, 0.8229, 0.8929, 0.8963],
    "Fillmore St 3300": [0.8103, 0.8282, 0.8094, 0.8049, 0.8869, 0.8675],
    "Lombard St 2100": [0.6936, 0.8014, 0.7395, 0.7380, 0.8538, 0.7102],
    "Lombard St 2200": [0.6116, 0.7184, 0.7101, 0.7171, 0.8149, 0.8750],
    "Lombard St 2300": [0.5261, 0.6777, 0.6292, 0.6417, 0.8265, 0.8465],
    "Lombard St 2400": [0.4062, 0.5634, 0.5537, 0.6148, 0.8172, 0.8438],
    "Lombard St 3200": [0.4540, 0.5681, 0.5616, 0.6021, 0.7533, 0.8527],
    "Mallorca Way 2000": [0.6450, 0.8843, 0.8239, 0.8185, 0.9829, 0.9636],
    "Pierce St 3200": [0.6398, 0.8991, 0.8749, 0.7999, 0.9334, 0.9795],
    "Pierce St 3300": [0.7358, 0.8431, 0.8103, 0.7860, 0.8429, 0.8791],
    "Scott St 3300": [0.7528, 0.8610, 0.8064, 0.8130, 0.9383, 0.9601],
    "Scott St 3300": [0.8235, 0.8698, 0.8641, 0.8734, 0.9873, 0.9857],
    "Steiner St 0": [0.7402, 0.9222, 0.9025, 0.7384, 0.9497, 0.9548]
  },
  "Mission": {
    "16Th St 3100": [0.5919, 0.6854, 0.7080, 0.6205, 0.7654, 0.7675],
    "16Th St 3200": [0.5454, 0.8066, 0.8196, 0.6353, 0.8601, 0.8678],
    "17Th St 3300": [0.3909, 0.6279, 0.6428, 0.4726, 0.8775, 0.8692],
    "18Th St 3400": [0.4379, 0.6953, 0.6722, 0.5987, 0.8717, 0.9019],
    "19Th St 3500": [0.7424, 0.8410, 0.8497, 0.7482, 0.9250, 0.9049],
    "20Th St 400": [0.7448, 0.7895, 0.8160, 0.8198, 0.8991, 0.8768],
    "21St St 3200": [0.7358, 0.7553, 0.8251, 0.7544, 0.8582, 0.8294],
    "22Nd St 3300": [0.7436, 0.8112, 0.8211, 0.7731, 0.8013, 0.8175],
    "23Rd St 3400": [0.7131, 0.7446, 0.7580, 0.7097, 0.8607, 0.8823],
    "Bartlett St 1000": [0.5987, 0.6795, 0.7151, 0.5074, 0.8174, 0.7784],
    "Mission St 2100": [0.6267, 0.7061, 0.6847, 0.6188, 0.6325, 0.6556],
    "Mission St 2200": [0.6324, 0.7553, 0.7692, 0.5818, 0.7716, 0.7664],
    "Mission St 2300": [0.6644, 0.8049, 0.7737, 0.6810, 0.8526, 0.8039],
    "Mission St 2400": [0.6360, 0.7693, 0.7976, 0.5895, 0.7752, 0.7393],
    "Mission St 2500": [0.8084, 0.8148, 0.8127, 0.7736, 0.7958, 0.7613],
    "Mission St 3000": [0.5438, 0.5556, 0.6317, 0.5035, 0.6604, 0.7286],
    "Valencia St 0": [0.5702, 0.7186, 0.7257, 0.5898, 0.8308, 0.8481],
    "Valencia St 1100": [0.6818, 0.7438, 0.7314, 0.6929, 0.8604, 0.8359],
    "Valencia St 1200": [0.7645, 0.7784, 0.7317, 0.7542, 0.7677, 0.7770],
    "Valencia St 2000": [0.5282, 0.5952, 0.6064, 0.5233, 0.7856, 0.6937],
    "Valencia St 500": [0.5820, 0.7656, 0.7831, 0.6838, 0.9087, 0.8526],
    "Valencia St 600": [0.6463, 0.8145, 0.8166, 0.4762, 0.7895, 0.8007],
    "Valencia St 700": [0.5709, 0.7838, 0.8197, 0.5744, 0.8511, 0.8831],
    "Valencia St 800": [0.6852, 0.8329, 0.8614, 0.7313, 0.9356, 0.9377],
    "Valencia St 900": [0.5106, 0.7200, 0.7822, 0.6024, 0.8776, 0.8598]
  },
  "SoMa": {
    "1st St 300": [0.7232, 0.6325, 0.6002, 0.6500, 0.6686, 0.7468],
    "2nd St 300": [0.7489, 0.8469, 0.7756, 0.2925, 0.3589, 0.5299],
    "2nd St 400": [0.2780, 0.5038, 0.4924, 0.1287, 0.2049, 0.4308],
    "2nd St 500": [0.5272, 0.7696, 0.7128, 0.3237, 0.7734, 0.8375],
    "2nd St 600": [0.5878, 0.7334, 0.6386, 0.2450, 0.5485, 0.5557],
    "2nd St 700": [0.5583, 0.7897, 0.5800, 0.5777, 0.8309, 0.8182],
    "3rd St ": [0.6427, 0.7748, 0.6667, 0.4710, 0.6265, 0.6872],
    "3rd St 300": [0.2269, 0.4524, 0.4359, 0.1738, 0.4274, 0.5007],
    "3rd St 400": [0.1936, 0.3169, 0.1740, 0.2256, 0.3817, 0.4315],
    "3rd St 500": [0.3457, 0.4570, 0.4703, 0.1162, 0.2107, 0.3401],
    "3rd St 600": [0.5296, 0.6403, 0.6101, 0.1039, 0.2532, 0.4210],
    "4th St 600": [0.6203, 0.7304, 0.6597, 0.4179, 0.5378, 0.6139],
    "Brannan St 200": [0.4869, 0.5752, 0.5261, 0.2557, 0.3947, 0.6330],
    "Brannan St 300": [0.5423, 0.6900, 0.6250, 0.2632, 0.4276, 0.6034],
    "Brannan St 400": [0.5395, 0.6704, 0.6585, 0.3854, 0.4691, 0.5394],
    "Brannan St 500": [0.4246, 0.6382, 0.5145, 0.1891, 0.3664, 0.5864],
    "Bryant St 300": [0.3565, 0.4083, 0.3318, 0.1123, 0.1249, 0.2171],
    "Bryant St 500": [0.4177, 0.5518, 0.4916, 0.1472, 0.2795, 0.3743],
    "Bryant St 500": [0.5670, 0.6536, 0.5854, 0.2491, 0.3569, 0.4708],
    "Folsom St 0": [0.6627, 0.8031, 0.7322, 0.4165, 0.5499, 0.3428],
    "Folsom St 500": [0.8204, 0.7606, 0.6290, 0.4635, 0.3663, 0.3373],
    "Folsom St 700": [0.7159, 0.7862, 0.7193, 0.2413, 0.4043, 0.5086],
    "Harrison St 0": [0.3785, 0.6626, 0.6036, 0.3144, 0.7161, 0.6806],
    "Harrison St 100": [0.1426, 0.4039, 0.2725, 0.0065, 0.4172, 0.6328],
    "Harrison St 600": [0.4953, 0.4463, 0.3945, 0.3550, 0.4181, 0.5915],
    "Hawthorne St 100": [0.8388, 0.8273, 0.7849, 0.2956, 0.4219, 0.4348],
    "King St 100": [0.6900, 0.8285, 0.7815, 0.2619, 0.6660, 0.7221],
    "Main St 300": [0.4038, 0.4936, 0.6777, 0.2406, 0.2835, 0.3506],
    "Spear St 300": [0.7141, 0.9177, 0.8706, 0.3974, 0.5537, 0.7408],
    "Townsend St 100": [0.5125, 0.6767, 0.6517, 0.4451, 0.5615, 0.6226],
    "Townsend St 200": [0.7868, 0.8035, 0.7432, 0.4856, 0.7456, 0.7427],
    "Townsend St 300": [0.7132, 0.7772, 0.7293, 0.6479, 0.7766, 0.8354],
    "Townsend St 400": [0.7682, 0.8414, 0.7481, 0.6821, 0.7147, 0.6856]
  }
};
