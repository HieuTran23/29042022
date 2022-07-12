export const createArray = ({length}) => {
    return Array.from({length: length}, (_, i) => i + 1)
}