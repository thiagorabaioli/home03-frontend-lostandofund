import './styles.css';

type Props = {
    text: string;
}

export default function ButtonInverse({ text }: Props) {
    return (
        <div className="tfr-btn tfr-btn-white">
            {text}
        </div>
    );
}
