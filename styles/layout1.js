let lastImageIndex = -2;

function getRandomImage() {
  const imageGallery = [
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (1).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (2).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (3).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (4).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (5).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (6).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (7).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (8).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (9).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (10).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (11).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (12).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (13).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (14).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (15).jpg",
    "https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (16).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (17).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (18).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (19).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (20).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (21).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (22).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (23).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (24).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (25).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (26).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (27).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (28).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (29).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (30).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (31).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (32).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (33).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (34).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (35).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (36).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (37).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (38).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (39).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (40).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (41).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (42).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (43).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (44).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (45).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (46).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (47).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (48).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (49).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (50).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (51).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (52).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (53).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (54).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (55).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (56).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (57).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (58).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (59).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (60).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (61).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (62).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (63).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (64).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (65).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (66).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (67).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (68).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (69).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (70).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (71).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (72).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (73).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (74).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (75).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (76).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (77).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (78).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (79).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (80).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (81).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (82).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (83).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (84).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (85).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (86).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (87).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (88).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (89).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (90).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (91).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (92).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (93).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (94).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (95).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (96).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (97).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (98).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (99).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (100).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (101).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (102).jpg",
"https://fenixfgx.github.io/Fenix/GIRLS/Amy/amy (103).jpg",
    
  ];

  let randomIndex = Math.floor(Math.random() * imageGallery.length);

  // Asegurarse de que no se repita la misma imagen
  while (randomIndex === lastImageIndex) {
    randomIndex = Math.floor(Math.random() * imageGallery.length);
  }

  lastImageIndex = randomIndex;

  return imageGallery[randomIndex];
}
      
