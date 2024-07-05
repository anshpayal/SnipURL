/* eslint-disable react/prop-types */

const FeatureCard = ({ Icon, heading, content }) => {
  return (
    <div className="border border-slate-600 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
      <Icon className="mb-2" />
      <h3 className=" text-sm sm:text-lg font-bold mb-2">{heading}</h3>
      <p className="hidden sm:block">{content}</p>
    </div>
  );
};

export default FeatureCard;
