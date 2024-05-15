using FluentValidation;
using ReDo.server.DTOs;

namespace ReDo.server.Validation;

public class CreateReDoItemDtoValidator : AbstractValidator<CreateReDoItemDto> {

    public CreateReDoItemDtoValidator() {

        const int minLength = 1;
        const int maxLength = 100;

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is requried.")
            .Length(minLength, maxLength)
            .WithMessage($"Description must be between {minLength} and {maxLength} characters."); 

    }
    
}