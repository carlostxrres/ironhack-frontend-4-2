// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map((movie) => movie.director);
  return Array.from(new Set(directors));
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const DIRECTOR_NAME = 'Steven Spielberg';
  const GENRE = 'Drama';
  const moviesByHim = moviesArray.filter(
    (movie) => movie.director === DIRECTOR_NAME && movie.genre.includes(GENRE)
  );
  return moviesByHim.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  const moviesNumber = moviesArray.length;
  if (moviesNumber === 0) {
    return 0;
  }

  const totalScore = moviesArray.reduce((acc, movie) => {
    const hasScore = movie.score !== undefined;
    return hasScore ? acc + movie.score : acc;
  }, 0);
  const rawAverage = totalScore / moviesNumber;
  const roundedAverageString = rawAverage.toFixed(2);
  return Number(roundedAverageString);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes('Drama')
  );
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray.slice().sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map((movie) => movie.title)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function timeStringToInt(timeString, timeUnitName) {
  if (!timeString) {
    return 0;
  }
  const cleanTimeString = timeString.replace(timeUnitName, '');
  return parseInt(cleanTimeString);
}
function hourMinutesToMinutes(hourMinutes) {
  const [hours, minutes] = hourMinutes.split(' ');
  const hoursInt = timeStringToInt(hours, 'h');
  const minutesInt = timeStringToInt(minutes, 'min');
  return hoursInt * 60 + minutesInt;
}
function turnHoursToMinutes(moviesArray) {
  return moviesArray.slice().map((movie) => {
    if (!movie.duration) {
      return movie;
    }
    const durationInt = hourMinutesToMinutes(movie.duration);
    return { ...movie, duration: durationInt };
  });
}
// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }
  const moviesByYear = moviesArray.reduce((acc, movie) => {
    const year = movie.year;
    acc[year] ??= [];
    acc[year].push(movie);
    return acc;
  }, {});

  const averageByYear = Object.entries(moviesByYear).reduce(
    (acc, [year, movies]) => {
      acc.push([year, scoresAverage(movies)]);
      return acc;
    },
    []
  );

  let bestAverage = 0;
  let bestYear = 'no one';
  averageByYear.forEach(([year, average]) => {
    if (average > bestAverage) {
      bestAverage = average;
      bestYear = year;
    }
  });

  return `The best year was ${bestYear} with an average score of ${bestAverage}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
