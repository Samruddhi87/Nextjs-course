import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head';
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://images.unsplash.com/photo-1602016082375-2eec3e992d3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwc3VufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://images.unsplash.com/photo-1602016082375-2eec3e992d3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwc3VufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!'
//   }
// ];

function HomePage(props) {
  
 
  return (
  <Fragment>
    <Head>
      <title>react meetups</title>
      <meta name='desc' content="fffdwew"/>
 
  </Head>
  <MeetupList meetups={props.meetups}></MeetupList>;
 </Fragment>
  )
}
// export async function getServerSideProps(context){
//   const req=context.req;
//   const res=context.res;
//   return{
//     props:{
//       meetups:DUMMY_MEETUPS
//     },
//     revalidate:1
//   }
// }
export async function getStaticProps() {
  // fetch('/api/meetups');
  const client = await MongoClient.connect(
    "mongodb+srv://Samruddhi:Samarekar87@cluster0.0cogj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups= await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
 meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
