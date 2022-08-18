import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const word = 'Calendar';

  return (
    <section className={classes.starting}>
      <h1>
        Your <span className={classes.slidingtext}>{word}</span> at Your Fingertips
      </h1>
      <h2>
        Control your schedule with the app created for bar and food service workers.
      </h2>
    </section>
  );
};

export default StartingPageContent;
