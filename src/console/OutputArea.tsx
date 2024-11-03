type OutputAreaProps = {
  output: string;
};

const OutputArea = ({ output }: OutputAreaProps) => {
  return <textarea id="output" value={output} readOnly={true} />;
};
export default OutputArea;
