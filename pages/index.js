import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title> Meetups </title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //   // fetch data from API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  const mongoClinet =
    "mongodb+srv://magedmaher602:xgwvPFy7SfzjGxYQ@cluster0.f2o4kie.mongodb.net/meetups?retryWrites=true&w=majority";
  let meetups = [];
  try {
    const client = await MongoClient.connect(mongoClinet);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    meetups = await meetupsCollection.find().toArray();
    client.close();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
