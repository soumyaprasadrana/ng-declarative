// suggestion-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'suggestionFilter'
})
export class SuggestionFilterPipe implements PipeTransform {
    transform(suggestions: any[], userInput: string): any[] {
        if (!userInput || userInput.trim() === '') {
            return suggestions;
        }

        return suggestions.filter(suggestion => suggestion.label.toLowerCase().includes(userInput.trim().toLowerCase()));
    }
}
