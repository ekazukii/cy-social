export function extractFirstSentence(text) {
    const firstSentence = text.match(/[^.!?]+[.!?]/);
    if (firstSentence) {
      return firstSentence[0] + ' [...]';
    } else {
      return text.substr(0,50) + ' [...]';
    }
  }