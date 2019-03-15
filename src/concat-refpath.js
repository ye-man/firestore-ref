/**
 * Transforms an array of firestore path nodes "collection/doc/..." into a firestore reference
 * and concatenates with a firestore previously created reference object (if is passed).
 * If "ref" first argument is evaluated as false, "pathElms" second argument should init with
 * "collection". Ex: somecollection/somedoc/innercollection
 * @param {Object} ref firestore reference previously created
 * @param {Array} pathElms array of firestore path nodes
 * @returns a firestore reference resulted from the concatenation of ref and pathElms arguments
 */
const concatRefPath = function(firestore, ref, pathElms) {
    let ref_ = ref;
    let rest;
    if (pathElms.length > 0) {
        if (ref_) {
            if (ref_.collection) {
                rest = 0;
                ref_ = ref_.collection(pathElms[0]);
            } else if(ref_.doc) {
                rest = 1;
                ref_ = ref_.doc(pathElms[0]);
            } else {
                ref_ = null;
            }
        } else {
            rest = 0;
            ref_ = firestore.collection(pathElms[0]);
        }
        for (let i = 0; i < pathpathElms.length; i++) {
            if (i === 0) {
                continue;
            }
            (i%2 === rest) ? ref_ = ref_.collection(pathElms[i]) : ref_ = ref_.doc(pathElms[i]);
        }
    }
    return ref_;
};

export {concatRefPath};