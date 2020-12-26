import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';

const RecipeEditor = ({ readOnly, blocks, updateBlocks }) => {
    const uid = `recipe-editor-${Date.now()}`;
    const editor = new EditorJS({
        holder: uid,
        readOnly,
        data: blocks,
        tools: {
            header: Header,
            list: List,
            link: Link,
            image: SimpleImage,
        },
        onChange: updateBlocks
            ? async () => {
                  const savedBlocks = await editor.save();
                  updateBlocks(savedBlocks);
              }
            : () => {},
    });

    return <div id={uid}></div>;
};

export default RecipeEditor;
