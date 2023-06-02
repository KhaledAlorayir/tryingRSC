type props = {
  params: { subjectId: string };
};

export default function Subject({ params }: props) {
  return <p>{params.subjectId}</p>;
}
