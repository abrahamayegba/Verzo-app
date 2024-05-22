import { gql, useSubscription } from "@apollo/client";

const Receiver = () => {
  const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription NewMessage($topic: String!) {
      newMessage(topic: $topic) {
        title
        message
        key
        type
        dateTime
      }
    }
  `;

  const { data, loading, error } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { topic: "test" },
  });

  if (error) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div>
        <h2>New Message</h2>
        <p>Title: {data.newMessage.title}</p>
        <p>Message: {data.newMessage.message}</p>
      </div>
    );
  }

  return (
    <section>
      <div>Waiting for messages...{data}</div>
    </section>
  );
};

export default Receiver;
