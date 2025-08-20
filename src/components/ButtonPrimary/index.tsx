import './styles.css';

type Props = {
    text: string;
}

export default function ButtonPrimary({ text }: Props) {
    return (
        <div className="tfr-btn tfr-btn-blue">
            {text}
        </div>
    );
}
