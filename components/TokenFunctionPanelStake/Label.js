import Typography from "../Typography";

export const DetailLabel = ({ title, desc }) => (
  <div className="d-flex justify-content-between">
    <Typography size="14" weight="400" color="text2">
      {title}
    </Typography>
    <Typography size="14" weight="600" color="text1">
      {desc}
    </Typography>
  </div>
);

export const ResultLabel = ({ title, desc }) => (
  <div className="d-flex justify-content-between">
    <Typography size="14" weight="600" color="text2">
      {title}
    </Typography>
    <Typography size="14" weight="600" color="text1">
      {desc}
    </Typography>
  </div>
);
