package sk.sillyclaws.megabrainshackathonproject.services;

import dev.langchain4j.agent.tool.ToolExecutionRequest;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.response.ChatResponse;
import org.springframework.stereotype.Component;
import dev.langchain4j.model.chat.ChatModel;

import java.util.ArrayList;
import java.util.List;

@Component
public class ChatBot {
    private final ChatModel chatModel;
    private List<ChatMessage> chatMessages = new ArrayList<>();
    private static final boolean DEBUG = true;

    public ChatBot(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public AiMessage processRequest(String prompt) {
        UserMessage userMessage = new UserMessage(prompt);
        chatMessages.add(userMessage);

        ChatRequest request = ChatRequest.builder()
                .messages(chatMessages)
                .build();

        ChatResponse chatResponse = chatModel.chat(request);
        AiMessage aiMessageBeforeToolExecution = chatResponse.aiMessage();

        AiMessage responseAiMessage;

        if (aiMessageBeforeToolExecution.hasToolExecutionRequests()) {

            if (DEBUG) System.out.println("aiMessageBeforeToolExecution: " + aiMessageBeforeToolExecution);

            ToolExecutionRequest toolExecutionRequest = aiMessageBeforeToolExecution.toolExecutionRequests().getFirst(); // we have only one tool, refactor else

            if (DEBUG) System.out.println("Executing tool: " + toolExecutionRequest.name());

//            String executionResult = toolExecutor.execute(toolExecutionRequest, "default");
//
//            ToolExecutionResultMessage toolExecutionResultMessage = ToolExecutionResultMessage.from(toolExecutionRequest, executionResult);
//
//            if (DEBUG) System.out.println("Tool returned: " + toolExecutionResultMessage);
//
//            ChatRequest requestWithToolOutput = ChatRequest.builder()
//                    .messages(List.of(userMessage, aiMessageBeforeToolExecution, toolExecutionResultMessage))
//                    .build();
//
//            ChatResponse responseWithToolResult = chatModel.chat(requestWithToolOutput);

//            responseAiMessage = responseWithToolResult.aiMessage();
            responseAiMessage = new AiMessage("Sorry, i am empty");
        } else {
            responseAiMessage = aiMessageBeforeToolExecution;
        }

        chatMessages.add(responseAiMessage);

        return responseAiMessage;
    }

}
