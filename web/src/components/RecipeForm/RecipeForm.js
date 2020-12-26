import {
    FieldError,
    Form,
    FormError,
    Label,
    Submit,
    TextField,
} from '@redwoodjs/forms';
import RecipeEditor from '../RecipeEditor/RecipeEditor';

const RecipeForm = (props) => {
    let blocks = [];
    const updateBlocks = (newBlocks) => (blocks = newBlocks);

    const onSubmit = async (data) => {
        props.onSave(
            { ...data, blocks: JSON.stringify(blocks) },
            props?.recipe?.id
        );
    };

    return (
        <div className="rw-form-wrapper">
            <Form onSubmit={onSubmit} error={props.error}>
                <FormError
                    error={props.error}
                    wrapperClassName="rw-form-error-wrapper"
                    titleClassName="rw-form-error-title"
                    listClassName="rw-form-error-list"
                />

                <Label
                    name="title"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Title
                </Label>
                <TextField
                    name="title"
                    defaultValue={props.recipe?.title}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />
                <FieldError name="title" className="rw-field-error" />

                <RecipeEditor
                    updateBlocks={updateBlocks}
                    readOnly={false}
                    blocks={
                        props.recipe
                            ? JSON.parse(props.recipe.blocks)
                            : undefined
                    }
                />

                <div className="rw-button-group">
                    <Submit
                        disabled={props.loading}
                        className="rw-button rw-button-blue"
                    >
                        Save
                    </Submit>
                </div>
            </Form>
        </div>
    );
};

export default RecipeForm;
