type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Рейтинг недвижимости</h4>
        {["5 Звезд", "4 Звезды", "3 Звезды", "2 Звезды", "1 Звезда"].map((star) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span>{star}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default StarRatingFilter;