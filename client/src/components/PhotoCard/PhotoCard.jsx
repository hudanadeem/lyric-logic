export default function PhotoCard({ image, name }) {
  return (
    <div className="photo-card">
      <img className="photo-card__image" src={image} />
      <p className="photo-card__name">{name}</p>
    </div>
  );
}
