const fetchMovies = async (language) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=${language}`
    );
    const data = await response.json();
    console.log("Hello"); 
  };
  