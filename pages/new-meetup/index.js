import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addMeetupHandler = (meetupData) => {
    setIsLoading(true);
    fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  };

  return (
    <Fragment>
      <Head>
        <title> Add a new meetup </title>
        <meta
          name="description"
          content="Add your own meetup and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm loading={isLoading} onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetup;
