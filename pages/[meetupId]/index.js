import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import MeetupDetals from "../../components/meetups/MeetupDetails";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDeatils = (props) => {
  return (
    <Fragment>
      <Head>
        <title> {props.meetupData.title} </title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetals
        img={props.meetupData.img}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const mongoClinet =
    "mongodb+srv://magedmaher602:xgwvPFy7SfzjGxYQ@cluster0.f2o4kie.mongodb.net/meetups?retryWrites=true&w=majority";
  let meetupsPaths = [];
  try {
    const client = await MongoClient.connect(mongoClinet);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    meetupsPaths = meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    }));
    client.close();
  } catch (error) {
    console.log(error);
  }

  return {
    fallback: "blocking",
    paths: meetupsPaths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const mongoClinet =
    "mongodb+srv://magedmaher602:xgwvPFy7SfzjGxYQ@cluster0.f2o4kie.mongodb.net/meetups?retryWrites=true&w=majority";

  const client = await MongoClient.connect(mongoClinet);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: meetupId,
        img: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
    revalidate: 3,
  };
}

export default MeetupDeatils;
