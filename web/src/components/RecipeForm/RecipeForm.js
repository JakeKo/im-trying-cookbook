import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import {
    FieldError,
    Form,
    FormError,
    Label,
    Submit,
    TextField,
} from '@redwoodjs/forms';

const RecipeForm = (props) => {
    const tools = {
        header: Header,
        list: List,
        link: Link,
        image: SimpleImage,
    };
    const editor = props.recipe
        ? new EditorJs({ data: JSON.parse(props.recipe.blocks), tools })
        : new EditorJs({ tools });

    const onSubmit = async (data) => {
        const editorData = await editor.save();
        props.onSave(
            { ...data, blocks: JSON.stringify(editorData) },
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

                <div id="editorjs" />

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
