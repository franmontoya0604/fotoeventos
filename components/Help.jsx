const Help = ({ message }) => {
  <ul className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56">
    <li className="bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer">
      {message}
    </li>
  </ul>;
};

export default Help;
