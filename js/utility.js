function convertSecondsToTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      seconds %= 3600;
    
      const minutes = Math.floor(seconds / 60);
    
      return `${hours} hours ${minutes} minutes`;
    }
    
    const x = convertSecondsToTime(34384);
    console.log(x);
    