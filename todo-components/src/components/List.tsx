// components/List.jsx

const List = (props:any) => {
  const { items } = props;
  return (
    <ul>
      {items.map((item:any, index:number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;