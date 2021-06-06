import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetUpDetail from "../../components/meetups/MeetupDetail";

const MeetUpDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetUpDetail
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:e7aCzTwsJUCRmR4n@cluster0.gdw9n.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: meetups.map((m) => ({ params: { meetupId: m._id.toString() } })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin:e7aCzTwsJUCRmR4n@cluster0.gdw9n.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
        address: selectedMeetup.data.address,
      },
    },
  };
};

export default MeetUpDetails;
