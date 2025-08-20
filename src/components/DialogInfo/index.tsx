import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string;
    onDialogClose: Function;
}

export default function DialogInfo({ message, onDialogClose }: Props) {

    return (
        <div className="tfr-dialog-background" onClick={() => onDialogClose()}>
            <div className="tfr-dialog-box" onClick={(event) => event.stopPropagation() }>
                <h2>{message}</h2>
                <div className="tfr-dialog-btn" onClick={() => onDialogClose()}>
                    <ButtonPrimary text="Ok" />
                </div>
            </div>
        </div>
    )
}
