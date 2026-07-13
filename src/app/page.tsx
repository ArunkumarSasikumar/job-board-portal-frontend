import { getServerSession } from 'next-auth';
import HomeClient from '../components/HomeClient';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default function Home() {
  // const session = getServerSession(authOptions);
  // console.log("Session",session);
  // if(!session){
  //   redirect("/auth")
  // }
  return <HomeClient />;
}
