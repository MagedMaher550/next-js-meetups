import classes from './MeetupDetails.module.css';

const MeetupDetals = (props) => {
  return (
    <section className={classes.details}>
      <img src={props.img} alt={props.meetupAlt | "meetup"} />
      <h1> {props.title} </h1>
      <address> {props.address} </address>
      <p> {props.description} </p>
    </section>
  );
};

export default MeetupDetals;
