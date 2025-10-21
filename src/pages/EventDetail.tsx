import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Event Detail</h1>
      <p className="text-muted-foreground">Event ID: {id}</p>
      <p className="mt-4">Event detail page - Coming soon</p>
    </div>
  );
};

export default EventDetail;
