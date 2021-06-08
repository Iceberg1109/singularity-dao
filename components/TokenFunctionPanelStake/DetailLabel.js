import Typography from "../Typography";

const DetailLabel = ({ title, desc }) => (
  <div className="d-flex justify-content-between">
    <Typography>{title}</Typography>
    <Typography>{desc}</Typography>
  </div>
);

export default DetailLabel;
