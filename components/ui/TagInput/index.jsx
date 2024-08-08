import { forwardRef, useCallback } from "react";

import { maybeCall } from "./maybe";
import TagInputTag from "./Tag";

export default forwardRef(function ChakraTagInput(
    {
        tags = [],
        onTagsChange,
        onTagAdd,
        onTagRemove,
        vertical = false,
        addKeys = ["Enter", "Tab"],
        wrapProps,
        wrapItemProps,
        tagProps,
        tagLabelProps,
        tagCloseButtonProps,
        ...props
    },
    ref
) {
    const addTag = useCallback(
        (event, tag) => {
            onTagAdd?.(event, tag);
            if (event.isDefaultPrevented()) return;

            onTagsChange?.(event, tags.concat([tag]));
        },
        [tags, onTagsChange, onTagAdd]
    );
    const removeTag = useCallback(
        (event, index) => {
            onTagRemove?.(event, index);
            if (event.isDefaultPrevented()) return;

            onTagsChange?.(event, [
                ...tags.slice(0, index),
                ...tags.slice(index + 1),
            ]);
        },
        [tags, onTagsChange, onTagRemove]
    );
    const handleRemoveTag = useCallback(
        (index) => (event) => {
            removeTag(event, index);
        },
        [removeTag]
    );
    const onKeyDown = props.onKeyDown;
    const handleKeyDown = useCallback(
        (event) => {
            onKeyDown?.(event);

            if (event.isDefaultPrevented()) return;
            if (event.isPropagationStopped()) return;

            const { currentTarget, key } = event;
            const { selectionStart, selectionEnd } = currentTarget;
            if (addKeys.indexOf(key) > -1 && currentTarget.value) {
                addTag(event, currentTarget.value);
                if (!event.isDefaultPrevented()) {
                    currentTarget.value = "";
                }
                event.preventDefault();
            } else if (
                key === "Backspace" &&
                tags.length > 0 &&
                selectionStart === 0 &&
                selectionEnd === 0
            ) {
                removeTag(event, tags.length - 1);
            }
        },
        [addKeys, tags.length, addTag, removeTag, onKeyDown]
    );

    return (
        <div className="text-center">
            <div className="grow" {...maybeCall(wrapItemProps, true, tags.length)}>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    {...props}
                    onKeyDown={handleKeyDown}
                    ref={ref}
                />
            </div>
            <div className="flex flex-row flex-wrap pl-4 pt-4 pr-4 min-h-[2rem]">
                {tags.map((tag, index) => (
                    <div
                        className="pl-1 pr-1"
                        {...maybeCall(wrapItemProps, false, index)}
                        key={index}
                    >
                        <TagInputTag
                            onRemove={handleRemoveTag(index)}
                            tagLabelProps={maybeCall(tagLabelProps, tag, index)}
                            tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
                            colorScheme={props.colorScheme}
                            size={props.size}
                            {...maybeCall(tagProps, tag, index)}
                        >
                            {tag}
                        </TagInputTag>
                    </div>
                ))}
            </div>
        </div>
    );
});
