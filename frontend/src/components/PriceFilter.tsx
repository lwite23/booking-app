type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
  };
  
  const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
      <div>
        <h4 className="text-md font-semibold mb-2"> Максимальная цена</h4>
        <select
          className="p-2 border rounded-md w-full"
          value={selectedPrice}
          onChange={(event) =>
            onChange(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
        >
          <option value="">Максимальная цена</option>
          {[5000 , 10000, 20000, 30000, 50000].map((price) => (
            <option value={price}>{price} рублей</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default PriceFilter;