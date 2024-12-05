import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div>
      <h1>Ops...Seems that you are lost.</h1>
      <p>This route doesn&apos;t exist</p>
      <Link to="/">Go back to the main page</Link>
    </div>
  );
}
